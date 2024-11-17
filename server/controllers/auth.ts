import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { shopifyFetch } from '~/libs/shopify/utils';
import { updateCartBuyerIdentity } from '~/libs/shopify';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const input = z
		.object({
			email: z.string().email(),
			password: z.string().min(5),
		})
		.parse(req.body);

	const customer = /* GraphQL */ `
		mutation customerAccessTokenCreate(
			$input: CustomerAccessTokenCreateInput!
		) {
			customerAccessTokenCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customerAccessToken {
					accessToken
					expiresAt
				}
			}
		}
	`;

	const response = await shopifyFetch<any, any>({
		query: customer,
		variables: {
			input: { email: input.email, password: input.password },
		},
	});

	if (!response.body.data.customerAccessTokenCreate.customerAccessToken) {
		res.statusCode = 404;
		throw new Error('Please check your email and password');
	}

	return res.status(200).json({
		success: true,
		message: 'Connected successfully!',
		user: response.body.data.customerAccessTokenCreate.customerAccessToken,
	});
};

const activate = async (req: NextApiRequest, res: NextApiResponse) => {
	const input = z
		.object({
			activationUrl: z.string(),
			password: z.string().min(8),
		})
		.parse(req.body);

	const customer = /* GraphQL */ `
		mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
			customerActivateByUrl(
				activationUrl: $activationUrl
				password: $password
			) {
				customer {
					id
				}
				customerAccessToken {
					accessToken
					expiresAt
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await shopifyFetch<any, any>({
		query: customer,
		variables: {
			activationUrl: input.activationUrl,
			password: input.password,
		},
	});

	if (response.body.data.customerActivateByUrl.customerUserErrors.length) {
		throw new Error(
			response.body.data.customerActivateByUrl.customerUserErrors[0].message,
		);
	}

	return res.status(200).json({
		success: true,
		message: "You're account is activated successfully",
		user: response.body.data.customerActivateByUrl,
	});
};

const checkToken = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse,
) => {
	const accessToken = req.headers.accesstoken;

	if (!accessToken) {
		throw new Error('Access Token not found');
	}

	if (accessToken) {
		const customerQuery = /* GraphQL */ `
          query {
          customer(customerAccessToken: ${JSON.stringify(accessToken)}) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
            createdAt
            defaultAddress {id address1 address2  city company country zip province phone}
            addresses(first:250) {
               edges{
                 node{
                   id
                   address1
                   address2
                   city
                   company
                   country
                   firstName
                   lastName
                   province
                   zip
                   phone
                 }
               }
            }
            orders(first:250) {
              edges {
                node{
                  id
                  orderNumber
                  email
                  name
                  phone
				  cancelReason
				  canceledAt
				  edited
				  financialStatus
				  fulfillmentStatus
				  statusUrl
                  totalPrice {
                    amount
                    currencyCode
                  }
                  totalShippingPrice {
                    amount
                    currencyCode
                  }
                  totalTax {
                    amount
                    currencyCode
                  }
                  totalRefunded{
                    amount
                    currencyCode
                  }
                  lineItems(first:250){
                      edges{
                        node{
                          currentQuantity
                          quantity
                          title
						  originalTotalPrice { 
							amount
							currencyCode
						  }
                          variant {
                            id
                            image {
                              id
                              height
                              width
                              url
                              altText
                            }
                            price {
                              amount
                              currencyCode
                            }
                            product {
                              id
                              handle
                              title
                              totalInventory
                              availableForSale
                              description
                              images(first:250){
                                edges { 
                                  node {
                                      id
                                      width
                                      height
                                      url
                                  }
                                }
                              }
                              updatedAt
                              createdAt
                            }
                            quantityAvailable
                            title
                          }
                        }
                      }
                  }
                  processedAt
                }
              }
            }
            
          }
        }
         `;

		const response = await shopifyFetch<any, any>({
			query: customerQuery,
		});

		if (!response.body.data.customer) {
			throw new Error('Customer not found');
		}

		return res.status(200).json({
			success: true,
			message: '',
			user: response.body.data.customer,
			//checkoutUrl
		});
	} else {
		throw new Error();
	}
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	const accessToken = req.headers.accesstoken;

	const deletedAccessToken = /* GraphQL */ `
		mutation customerAccessTokenDelete($customerAccessToken: String!) {
			customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
				deletedAccessToken
				deletedCustomerAccessTokenId
				userErrors {
					field
					message
				}
			}
		}
	`;

	const response = await shopifyFetch<any, any>({
		query: deletedAccessToken,
		variables: {
			customerAccessToken: accessToken,
		},
	});

	if (!response.body.data.customerAccessTokenDelete) {
		throw new Error('Access Token not valid');
	}

	const cartId = (await cookies()).get('cartId')?.value;

	if (cartId) {
		await updateCartBuyerIdentity(cartId, { customerAccessToken: null });
		(await cookies()).set('cartId', '');
	}

	return res.status(200).json({
		success: true,
		message: 'Logout successfully!',
	});
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
	const input = z
		.object({
			acceptsMarketing: z.boolean(),
			email: z.string().email(),
			phone: z.string().optional(),
			password: z.string().min(8),
			firstName: z.string().min(2),
			lastName: z.string().min(2),
		})
		.parse(req.body);

	const createCustomerMutation = /* GraphQL */ `
		mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customer {
					id
					firstName
					lastName
					acceptsMarketing
					defaultAddress {
						address1
						address2
						city
						company
						country
						province
						zip
					}
					createdAt
				}
			}
		}
	`;

	const response = await shopifyFetch<any, any>({
		query: createCustomerMutation,
		variables: {
			input: {
				acceptsMarketing: input.acceptsMarketing,
				email: input.email,
				password: input.password,
				firstName: input.firstName,
				lastName: input.lastName,
				phone: input.phone,
			},
		},
	});

	if (!response.body.data.customerCreate) {
		throw new Error(
			'Account already exists check your email for confirmation ',
		);
	}

	if (
		response.body.data.customerCreate?.customerUserErrors[0] &&
		response.body.data.customerCreate?.customerUserErrors[0].code === 'TAKEN'
	) {
		throw new Error('Account already exists check your email for confirmation');
	}

	return res.status(201).json({
		success: true,
		message: `Account created successfully!`,
		response: response.body.data.customerCreate.customer,
	});
};

const authController = {
	login,
	activate,
	checkToken,
	logout,
	register,
};

export default authController;
