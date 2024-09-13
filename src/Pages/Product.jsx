import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import Productdisplay from '../Components/Productdisplay/Productdisplay';
import Discriptionbox from '../Components/Discriptionbox/Discriptionbox';


const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    //console.log('all_product:', all_product);
    //console.log('productId:', productId);
    const product = all_product.find((e) => e.id === Number(productId));
    //console.log('product:', product);

    if (!product) {
        return <div>Product not found</div>;
    }   

    return (
        <div>
            <Breadcrum product={product} />
            <Productdisplay product={product}/>
            <Discriptionbox description={product.description} />
           
        </div>
    );
};

export default Product;
