import Button from '@components/shared/core/Button';
import Image from 'next/image'
import React from 'react'
import classes from "../../../../styles/productsPages.module.scss"
import { useAddProductsToCheckoutAndCart } from '@utils/core/hooks';

const ProductDetails = ({product}) => {

  const addProductsToCheckoutAndCart = useAddProductsToCheckoutAndCart();

  return (
    <div className={classes.ProductCardDetailsContainer}>
    <div></div>
    <div className={classes.ProductCardDetails} >
       <div>
       <Image alt={product.title} width={product.variants[0].image.width} height={product.variants[0].image.height} src={product.variants[0].image.src} />
       </div>
        <div>
        <h4> DECAP - {product.title}</h4>
        <p> ${product.variants[0].price.amount} </p>
        <p> <span>Shipping</span> calculated at checkout.</p>
        <p>Pay in 4 interest-free installments of $12.50 with <Image width={143} height={32} src={"/images/shoppay.png"} alt='shoppay' /> </p> 
        <div>
           <Button 
           onClick={() =>
            addProductsToCheckoutAndCart.mutate({
              products: [{ ...product, quantity: 1 }]
            })
          }
          >
              Add To Cart
           </Button>
           <div className={classes.cardsPayments} >
          <Image alt='paymentCards' width={900} height={150} src={"/images/payment_cards.png"} />
        </div>
        </div>
        </div>
    </div>
    </div>      
  )
}

export default ProductDetails