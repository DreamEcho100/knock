import type { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

import axios from 'axios';

import gql from 'graphql-tag';

import { print } from 'graphql';

const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
	process.env.SENDINBLUE_API_SMTP;

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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
	const input = z.object({ email: z.string().email() }).parse(req.body);

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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				email: input.email
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
			}
		}
	);

	if (!response.data.data.customerRecover) {
		res.statusCode = 429;
		throw new Error(
			'The user sent too many requests in a given amount of time.'
		);
	}

	if (
		response.data.data.customerRecover.customerUserErrors.length &&
		response.data.data.customerRecover.customerUserErrors[0].code
	) {
		res.statusCode = 404;
		throw new Error(
			response.data.data.customerRecover.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Recovery email sent successfully'
	});
};

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
	const input = z
		.object({
			password: z.string().min(8),
			resetUrl: z.string()
		})
		.parse(req.body);

	const customer = gql`
		mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
			customerResetByUrl(password: $password, resetUrl: $resetUrl) {
				customer {
					id
					email
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
		{
			query: print(customer),
			variables: {
				password: input.password,
				resetUrl: input.resetUrl
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token':
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
			}
		}
	);

	if (response.data.errors) {
		res.statusCode = 404;
		throw new Error(response.data.errors[0].message);
	}

	if (
		response.data.data.customerResetByUrl &&
		response.data.data.customerResetByUrl.customerUserErrors.length
	) {
		res.statusCode = 404;
		throw new Error(
			response.data.data.customerResetByUrl.customerUserErrors[0].message
		);
	}

	return res.status(200).json({
		success: true,
		message: 'Reset password done successfully',
		user: response.data.data.customerResetByUrl
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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
			`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
		`https://${process.env.DOMAINE}/api/2023-01/graphql.json`,
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
					process.env.SHOPIFY_STOREFRONT_API_TOKEN,
				'accept-encoding': 'null'
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

const subscribeToNewsLetters = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const email = z.string().email().parse(req.body.email);

	let apiInstance = new SibApiV3Sdk.ContactsApi();

	try {
		let createContact = new SibApiV3Sdk.CreateContact();

		createContact.email = email;
		createContact.listIds = [51];
		const response = await apiInstance.createContact(createContact);

		return res.status(200).json({
			success: true,
			message: 'You have been subscribed successfully!',
			response
		});
	} catch (error) {
		res.statusCode = error.status;
		throw new Error('You are already subscribed to the newsletter');
	}
};

const supportForm = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const input = z
		.object({
			email: z.string().email(),
			orderNumber: z.string().optional(),
			subject: z.string(),
			message: z.string(),
			fullName: z.string().min(2),
			countryCode: z.string().min(3)
		})
		.parse(req.body);

	const email = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
		{
			sender: {
				email: input.email,
				name: input.fullName
			},
			subject: input.subject,
			htmlContent: `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8" />
							<meta http-equiv="X-UA-Compatible" content="IE=edge" />
							<meta name="viewport" content="width=device-width, initial-scale=1.0" />
							<link rel="preconnect" href="https://fonts.googleapis.com" />
							<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
							<link
							href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap"
							rel="stylesheet"
							/>
							<title>Contact Email</title>
						</head>
						<style>
							body {
							font-family: "Lato", sans-serif;
							}
							p {
							color: black;
							text-align: left;
							font-family: "Lato", sans-serif;
							line-height: 1.6;
							font-size: 14px;
							padding: 0px 0 0;
							margin: 0;
							}
							a{
							color: #4E7FA1;
							}
						</style>

						<body>
							<table style="width: 100%; height: 100%; padding: 20px 0">
							<tbody >
								<tr>
								<td style="height: 1%">
									<table
									style="
										background-color: #ffffff;
										width: 100%;
										height: 100%;
										max-width: 500px;
										margin: 0 auto;
										position: relative;
										border: 2px solid #e3e3e3;
										border-radius: 10px;
									"
									>
									<tbody>
										<tr>
										<td style="height: 1%; padding: 10px 30px 0">
											<p style="font-size: 14px">
											You received a new message from your online store's
											contact <br />
											form
											</p>
											<hr
											style="height: 2px; border: none; background: #e3e3e3"
											/>
										</td>
										</tr>

										<tr>
										<td style="height: 1%; padding: 10px 30px">
											<p style="font-weight: 900 ;" >
											Country Code:
											</p>
											<p style="font-weight: 500 ;"  >${input.countryCode}</p>
										</td>
										</tr>
										<tr>
										<td style="height: 1%;  padding: 10px 30px">
											<p style="font-weight: 900 ;" >
											Name:
											</p>
											<p style="font-weight: 500 ;" >
											${input.fullName}
											</p>
										</td>
										</tr>
										<tr>
										<td style="height: 1%; padding: 10px 30px">
											<p style="font-weight: 900 ;">
											Email:
											</p>
											<p style="font-weight: 500 ;"  >
											<a href="mailto:${input.email}"> ${input.email} </a>
											</p>
										</td>
										</tr>
										${
											input.orderNumber
												? `
										<tr>
										<td style="height: 1%; padding: 10px 30px">
											<p style="font-weight: 900 ;">
											Order Number:
											</p>
											<p style="font-weight: 500 ;"  >
											#${input.orderNumber}
											</p>
										</td>
										</tr>`
												: ''
										}
										<tr>
										<td style="height: 1%; padding: 0 30px">
											<p style="font-weight: 900 ;" >
											Body:
											</p>
											<p  style="padding-bottom: 20px ; font-weight: 500 ;" > ${input.message} </p>
										</td>
										</tr>
										<tr>
										<td  style="height: 1%; padding: 0 30px">
											<p style="font-weight: 900 ;" >
											Thank you
											</p>
											<p style="font-weight: 500 ; padding-bottom: 20px ;" >${input.fullName}</p>
										</td>
										</tr>
									</tbody>
									</table>
								</td>
								</tr>
							</tbody>
							</table>
						</body>
						</html>
				`,

			to: [
				{
					email: process.env.NEXT_PUPLIC_FORMSUBMIT_EMAIL
				}
			]
		}
	);

	if (email) {
		return res.status(200).json({
			success: true,
			message: 'The form was sent successfully!',
			email
		});
	}
};

const redeemCode = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const data = req.body;

	const response = await axios.post(
		`https://redeem2.${process.env.REDEEM_DOMAIN}/api/price-rules`,
		data,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	if (response.data.verified === false) {
		res.statusCode = 404;
		throw new Error('INVALID CODE!');
	}

	return res.status(200).json({
		success: true,
		message: 'VALID CODE',
		data: response.data
	});
};

const createOrderRedeemCode = async (
	req: NextApiRequest & { params: Record<string, any> },
	res: NextApiResponse
) => {
	const input = z
		.object({
			redeemCode: z.string().min(4),
			firstName: z.string().min(2),
			lastName: z.string().min(2),
			email: z.string().email(),
			variantId: z.string(),
			productId: z.string(),
			price: z.number()
		})
		.parse(req.body);

	const isRedeemCodeWork = await axios.post(
		`https://redeem2.${process.env.REDEEM_DOMAIN}/api/price-rules`,
		{
			data: {
				customer_code: input.redeemCode,
				product_id: input.productId,
				variant_id: input.variantId
			}
		},
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	if (isRedeemCodeWork.data.verified === false) {
		res.statusCode = 404;
		throw new Error('INVALID CODE!');
	}

	const response = await axios.post(
		`https://redeem2.${process.env.REDEEM_DOMAIN}/api/create-order`,
		{
			data: {
				customer_code: input.redeemCode
			},
			order: {
				billing_address: {
					first_name: input.firstName,
					last_name: input.lastName
				},
				customer: {
					email: input.email,
					first_name: input.firstName,
					last_name: input.lastName
				},
				email: input.email,
				line_items: [
					{
						price: input.price,
						quantity: 1,
						variant_id: input.variantId
					}
				],
				shipping_address: {
					first_name: input.firstName,
					last_name: input.lastName
				}
			}
		},
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return res.status(200).json({
		success: true,
		message:
			'Thanks for ordering from Plugins That Knock. Your payment has cleared',
		data: response.data
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
	resetPassword,
	subscribeToNewsLetters,
	supportForm,
	redeemCode,
	createOrderRedeemCode
};

export default clientsController;
