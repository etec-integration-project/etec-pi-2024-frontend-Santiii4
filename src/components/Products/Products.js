import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    // Obtener productos desde el backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products`);  // Usar variable de entorno
                if (!response.ok) {
                    throw new Error('Error al obtener productos');
                }
                const data = await response.json();
                setProducts(data);  // Guardar productos en el estado
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    // Manejar la adición al carrito
    const addToCart = (productId) => {
        fetch(`http://localhost:8000/cart/add`, {
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

    // Asignar imágenes basadas en el nombre del producto
    const getProductImage = (productName) => {
        if (productName === '12 Pallets') {
            return '/12.jpg';  // Imagen para 12 pallets
        } else if (productName === '24 Pallets') {
            return '/24.jpg';  // Imagen para 24 pallets
        } else {
            return '/default.jpg';  // Imagen por defecto, puedes agregarla si lo deseas
        }
    };

    return (
        <div className="products">
            <h1>Lista de Productos</h1>
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






