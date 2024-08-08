// src/components/Products/Products.js
import React from 'react';
import './Products.css';
import image24Pallets from '../../assets/24palletesR.jpg';
import image12Pallets from '../../assets/24palletes.jpg';

const Products = () => {
    return (
        <div className="products">
            <h1>Products</h1>
            <div className="product-list">
                <div className="product-item">
                    <img src={image24Pallets} alt="24 Pallets" className="product-image" />
                    <h2>24 Pallets</h2>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
                <div className="product-item">
                    <img src={image12Pallets} alt="12 Pallets" className="product-image" />
                    <h2>12 Pallets</h2>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Products;

