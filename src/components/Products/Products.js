import React from 'react';
import './Products.css';
import image24Pallets from '../../assets/24palletesR.jpg';
import image12Pallets from '../../assets/24palletes.jpg';

const Products = () => {
    // Manejar la adición al carrito
    const addToCart = (productId) => {
        fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, quantity: 1 })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto agregado al carrito:', data);
            // Aquí puedes mostrar una notificación o actualizar el estado del carrito si es necesario
        })
        .catch(error => console.error('Error al agregar al carrito:', error));
    };

    return (
        <div className="products">
            <h1>Products</h1>
            <div className="product-list">
                <div className="product-item">
                    <img src={image24Pallets} alt="24 Pallets" className="product-image" />
                    <h2>24 Pallets</h2>
                    <button className="add-to-cart" onClick={() => addToCart(1)}>Add to Cart</button>
                    {/* El ID 1 es un ejemplo, debería coincidir con el ID del producto en tu base de datos */}
                </div>
                <div className="product-item">
                    <img src={image12Pallets} alt="12 Pallets" className="product-image" />
                    <h2>12 Pallets</h2>
                    <button className="add-to-cart" onClick={() => addToCart(2)}>Add to Cart</button>
                    {/* El ID 2 es un ejemplo, debería coincidir con el ID del producto en tu base de datos */}
                </div>
            </div>
        </div>
    );
};

export default Products;


