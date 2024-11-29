import React, { useState, useEffect } from 'react';
import './Products.css';
import { API_URL } from '../../index';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    // Obtener productos desde el servidor
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (!response.ok) {
                    throw new Error('Error al obtener productos');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    // Manejar la adición al carrito
    const addToCart = async (productId) => {
        console.log('Intentando agregar al carrito: ', productId); // Log para depurar
        try {
            const response = await fetch(`${API_URL}/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Asegura el envío de cookies
                body: JSON.stringify({ id: productId, quantity: 1 }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log('Error en la respuesta del backend:', error); // Log detallado
                throw new Error(error.message || 'Error al agregar al carrito');
            }

            setMessage('Producto agregado al carrito con éxito');
        } catch (error) {
            setMessage('Error al agregar al carrito');
            console.error('Error al agregar al carrito:', error);
        }
    };

    const getProductImage = (productName) => {
        if (productName === '12 Pallets') {
            return '/12.jpg';
        } else if (productName === '24 Pallets') {
            return '/24.jpg';
        } else {
            return '/default.jpg';
        }
    };

    return (
        <div className="products">
            <h1>Lista de Productos</h1>
            {message && <p className="text-center" style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="product-item" key={product.id}>
                            <img src={getProductImage(product.name)} alt={product.name} className="product-image" />
                            <h2>{product.name}</h2>
                            <p>Precio: {product.price}</p>
                            <button className="add-to-cart" onClick={() => addToCart(product.id)}>Agregar al carrito</button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )}
            </div>
        </div>
    );
};

export default Products;








