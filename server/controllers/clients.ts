import type { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

import axios from 'axios';

import gql from 'graphql-tag';

import { print } from 'graphql';

import validator from 'validator';

import API_URL from './apiUrl';

const deleteAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	const customer = gql`
		mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
			customerAddressDelete(
				customerAccessToken: $customerAccessToken
				id: $id
			) {
				customerUserErrors {
					code
					field
					message
				}
				deletedCustomerAddressId
			}
		}
	`;
	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				customerAccessToken: data.customerAccessToken,
				id: data.addressId
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}
		throw new Error('Customer address not found');
	}

	if (!response.data.data.customerAddressDelete.deletedCustomerAddressId) {
		throw new Error('Customer address not found');
	}

	return res.status(200).json({
		success: true,
		message: 'Customer address delete successfully'
	});
};

const addAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	if (!data.address.address1) {
		throw new Error('Please enter an address');
	}
	if (!data.address.city) {
		throw new Error('Please enter an city');
	}
	if (!data.address.country) {
		throw new Error('Please enter an country');
	}
	if (!data.address.province) {
		throw new Error('Please enter an province');
	}
	if (!data.address.zip) {
		throw new Error('Please enter an zip');
	}
	if (!data.address.phone) {
		throw new Error('Please enter an phone');
	}

	const customer = gql`
		mutation customerAddressCreate(
			$address: MailingAddressInput!
			$customerAccessToken: String!
		) {
			customerAddressCreate(
				address: $address
				customerAccessToken: $customerAccessToken
			) {
				customerAddress {
					id
					address1
					address2
					city
					company
					firstName
					lastName
					phone
					province
					zip
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;
	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				address: {
					address1: data.address.address1,
					address2: data.address.address2,
					city: data.address.city,
					company: data.address.company,
					country: data.address.country,
					firstName: data.address.firstName,
					lastName: data.address.lastName,
					phone: data.address.phone,
					province: data.address.province,
					zip: data.address.zip
				},
				customerAccessToken: data.customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (!response.data.data.customerAddressCreate) {
		throw new Error('Access token is not valid');
	}

	if (response.data.data.customerAddressCreate.customerAddress) {
		return res.status(200).json({
			success: true,
			message: 'Address added successfully'
		});
	} else {
		throw new Error(
			response.data.data.customerAddressCreate.customerUserErrors[0].message
		);
	}
};

const defaultAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const { addressId, customerAccessToken } = req.body;

	const customer = gql`
		mutation customerDefaultAddressUpdate(
			$addressId: ID!
			$customerAccessToken: String!
		) {
			customerDefaultAddressUpdate(
				addressId: $addressId
				customerAccessToken: $customerAccessToken
			) {
				customer {
					id
					firstName
					lastName
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				addressId,
				customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}
		throw new Error('Customer address not found');
	}

	if (!response.data.data.customerDefaultAddressUpdate.customer) {
		throw new Error('Customer address not found');
	}

	return res.status(200).json({
		success: true,
		message: 'Customer address is now setted up default successfully'
	});
};

const editAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;

	const customer = gql`
		mutation customerAddressUpdate(
			$address: MailingAddressInput!
			$customerAccessToken: String!
			$id: ID!
		) {
			customerAddressUpdate(
				address: $address
				customerAccessToken: $customerAccessToken
				id: $id
			) {
				customerAddress {
					id
					address1
					address2
					city
					company
					firstName
					lastName
					phone
					province
					zip
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				address: {
					address1: data.address.address1,
					address2: data.address.address2,
					city: data.address.city,
					company: data.address.company,
					country: data.address.country,
					firstName: data.address.firstName,
					lastName: data.address.lastName,
					phone: data.address.phone,
					province: data.address.province,
					zip: data.address.zip
				},
				customerAccessToken: data.customerAccessToken,
				id: data.id
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		if (response.data.errors[0].extensions.code === 'ACCESS_DENIED') {
			throw new Error('Access denied verify your api key');
		}

		throw new Error('Address not found');
	}

	if (!response.data.data.customerAddressUpdate.customerAddress) {
		throw new Error(
			response.data.data.customerAddressUpdate.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Address edited successfully'
	});
};

const recoverPassword = async (req: NextApiRequest, res: NextApiResponse) => {

	const input = z.object({email: z.string().email().optional()}).parse(req.body);

	const customer = gql`
		mutation customerRecover($email: String!) {
			customerRecover(email: $email) {
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;
	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				email:input.email
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (!response.data.data.customerRecover) {
		res.statusCode = 404
		throw new Error("Customer not found! or email already sent !");
	}

	if (response.data.data.customerRecover.customerUserErrors.length && response.data.data.customerRecover.customerUserErrors[0].code) {
		res.statusCode = 404
		throw new Error(response.data.data.customerRecover.customerUserErrors[0].message)
	}

	return res.status(200).json({
		success: true,
		message: 'Recovery email sent successfully'
	});
};

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {

	const input = z.object({
		id: z.string().optional(),
		password: z.string().min(8).optional(),
		resetToken: z.string().optional(),
	})
	.parse(req.body);

	const customer = gql`
		mutation customerReset($id: ID!, $input: CustomerResetInput!) {
		customerReset(id: $id, input: $input) {
		  customer {
			id
			email
			firstName
			lastName
			phone
			updatedAt
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
	  }`;
	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				id:`gid://shopify/Customer/${input.id}`,
				input:{
					password:input.password,
					resetToken:input.resetToken					
				}
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);



	if (response.data.errors) {
		res.statusCode = 404
		throw new Error(response.data.errors[0].message)
	}

	if (response.data.data.customerReset && response.data.data.customerReset.customerUserErrors.length) {
		res.statusCode = 404
		throw new Error(response.data.data.customerReset.customerUserErrors[0].message)
	}

	return res.status(200).json({
		success: true,
		message: 'Reset password done successfully',
		user:response.data.data.customerReset
	});
};

const updateOneController = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const customerAccessToken = req.headers.clientaccesstoken;

	const input = z
		.object({
			acceptsMarketing: z.boolean().optional(),
			email: z.string().email().optional(),
			phone: z.string().optional(),
			password: z.string().min(8).optional(),
			firstName: z.string().min(2).optional(),
			lastName: z.string().min(2).optional()
		})
		.parse(req.body);

	const customer = gql`
		mutation customerUpdate(
			$customer: CustomerUpdateInput!
			$customerAccessToken: String!
		) {
			customerUpdate(
				customer: $customer
				customerAccessToken: $customerAccessToken
			) {
				customer {
					id
					acceptsMarketing
					defaultAddress {
						address1
						address2
						city
						company
						country
						firstName
						lastName
						province
						zip
					}
					email
					firstName
					lastName
					phone
					updatedAt
					createdAt
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

	const response = await axios.post(
		API_URL,
		{
			query: print(customer),
			variables: {
				customer: {
					acceptsMarketing: input.acceptsMarketing,
					email: input.email,
					firstName: input.firstName,
					lastName: input.lastName,
					password: input.password,
					phone: input.phone
				},
				customerAccessToken
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	if (response.data.errors) {
		res.statusCode = 401;
		throw new Error(response.data.errors[0].message);
	}

	// It could return an empty array, and if that happen it will result to be true
	if (response.data.data.customerUpdate?.customerUserErrors?.length !== 0) {
		res.statusCode = 401;
		throw new Error(
			response.data.data.customerUpdate.customerUserErrors
				.map((el: any) => {
					return el.message;
				})
				.join(', ')
		);
	}

	return res.status(200).json({
		success: true,
		message: `Successful Update for user with id: ${response.data.data.customerUpdate.customer.id}`,
		client: response.data.data.customerUpdate.customer,
		accessTokenDetails: response.data.data.customerUpdate.customerAccessToken
	});
};

const getAllOrdersForOneClientByIdController = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const accessToken = req.headers.clientaccesstoken;
	const select = req.query.select;

	if (accessToken) {
		const { data } = await axios.post(
			API_URL,
			{
				query: `
          query {
          customer(customerAccessToken: ${JSON.stringify(accessToken)}) {
            id
            orders (first:${select || '250'})  {
                edges{
                    node{
                        id
                        name
                        orderNumber
                        originalTotalPrice {
                            amount
                            currencyCode
                        }
                        totalPrice{
                            amount
                            currencyCode
                        }
                        totalShippingPrice{
                            amount
                            currencyCode
                        }
                        totalTax{
                            amount
                            currencyCode
                        }
                        lineItems(first:${select || '250'}){
                            edges{
                                node{
                                    title
                                    currentQuantity
                                    originalTotalPrice{
                                        amount
                                        currencyCode
                                    }
                                    discountedTotalPrice{
                                        amount
                                        currencyCode
                                    }
                                    variant{
                                        id
                                        availableForSale
                                        barcode
                                        price{
                                            amount
                                            currencyCode
                                        }
                                        compareAtPrice{
                                            amount
                                            currencyCode
                                        }
                                        image{
                                            id
                                            url
                                            altText
                                            height
                                            width
                                        }
                                    }
                                    quantity
                                }
                            }
                        }
                        phone
                        processedAt
                        cancelReason
                        canceledAt
                        currencyCode
                        customerLocale
                        customerUrl
                        edited
                        email
                        financialStatus
                    }
					cursor
                }
				pageInfo {
					endCursor
					hasNextPage
				  }
            }
          }
        }
         `
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token':
						process.env.SHOPIFY_STOREFRONT_API_TOKEN
				}
			}
		);

		const customer = data.data.customer;

		if (!customer) {
			res.statusCode = 404;
			throw new Error('Customer not found');
		}

		return res.status(200).json({
			success: true,
			message: `Successful Request for user with id: ${customer.id}`,
			...customer
		});
	}
};
const getOneOrderForOneClientByIdController = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const { orderId } = req.params;
	const clientAccessToken = req.headers.clientaccesstoken;
	const { select, orderKey } = req.query;

	const { data } = await axios.post(
		API_URL,
		{
			query: `
            query {
                customer(customerAccessToken: ${JSON.stringify(
									clientAccessToken
								)}) {
                  id
                  orders (first:${select || '250'})  {
                      edges{
                          node{
                              id
                              name
                              orderNumber
                              originalTotalPrice {
                                  amount
                                  currencyCode
                              }
                              totalPrice{
                                  amount
                                  currencyCode
                              }
                              totalShippingPrice{
                                  amount
                                  currencyCode
                              }
                              totalTax{
                                  amount
                                  currencyCode
                              }
                              lineItems(first:${select || '250'}){
                                  edges{
                                      node{
                                          title
                                          currentQuantity
                                          originalTotalPrice{
                                              amount
                                              currencyCode
                                          }
                                          discountedTotalPrice{
                                              amount
                                              currencyCode
                                          }
                                          variant{
                                              id
                                              availableForSale
                                              barcode
                                              price{
                                                  amount
                                                  currencyCode
                                              }
                                              compareAtPrice{
                                                  amount
                                                  currencyCode
                                              }
                                              image{
                                                  id
                                                  url
                                                  altText
                                                  height
                                                  width
                                              }
                                          }
                                          quantity
                                      }
                                  }
                              }
                              phone
                              processedAt
                              cancelReason
                              canceledAt
                              currencyCode
                              customerLocale
                              customerUrl
                              edited
                              email
                              financialStatus
                          }
                      }
                  }
                }
              }
     `
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN
			}
		}
	);

	const customer = data.data.customer;

	if (!customer) {
		res.statusCode = 404;
		throw new Error('Customer not found');
	}

	const orders = customer.orders.edges;

	const filterOrder = orders.filter(
		(el: any) => el.node.id === `gid://shopify/Order/${orderId}?key=${orderKey}`
	);

	if (!filterOrder.length) {
		res.statusCode = 404;
		throw new Error('Please check your orderId and orderKey');
	}

	return res.status(200).json({
		success: true,
		message: `Successful Request for user with id: ${clientAccessToken} and order with id: ${req.params.orderId}`,
		order: filterOrder
	});
};

const clientsController = {
	address: {
		deleteOne: deleteAddress,
		addOne: addAddress,
		default: defaultAddress,
		editOne: editAddress
	},
	one: {
		orders: {
			getOne: getOneOrderForOneClientByIdController,
			getAll: getAllOrdersForOneClientByIdController
		}
	},
	updateOne: updateOneController,
	recoverPassword,
	resetPassword
};

export default clientsController;
