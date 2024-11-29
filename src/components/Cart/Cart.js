import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambié useHistory por useNavigate
import { API_URL } from '../..';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Reemplazamos useHistory por useNavigate

  // Obtener productos y carrito
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        const productsResponse = await fetch(`${API_URL}/products`);
        const cartResponse = await fetch(`${API_URL}/cart`, { credentials: 'include' });

        if (!productsResponse.ok || !cartResponse.ok) {
          throw new Error('Error al obtener productos o carrito');
        }

        const productsData = await productsResponse.json();
        const cartData = await cartResponse.json();

        setProducts(productsData);
        setCart(cartData);

        calculateTotal(cartData, productsData);
      } catch (error) {
        console.error('Error al obtener productos o carrito:', error);
      }
    };

    fetchProductsAndCart();
  }, []);

  // Calcular el total
  const calculateTotal = (cartItems, productList) => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const product = productList.find(p => p.id === item.product_id);
      return product ? sum + (product.price * item.quantity) : sum;
    }, 0);
    setTotal(totalPrice);
  };

  // Añadir cantidad
  const handleAddQuantity = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Error añadiendo cantidad');
      }

      const updatedCart = cart.map(item =>
        item.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
    } catch (error) {
      console.error('Error añadiendo cantidad:', error);
    }
  };

  // Reducir cantidad o eliminar producto
  const handleRemoveQuantity = async (productId) => {
    try {
      // Cambiar la ruta de la solicitud a /cart/remove
      const response = await fetch(`${API_URL}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: productId, quantity: 1 }), // Reducir cantidad
      });

      if (!response.ok) {
        throw new Error('Error reduciendo cantidad');
      }

      const updatedCart = cart.map(item =>
        item.product_id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
    } catch (error) {
      console.error('Error reduciendo cantidad:', error);
    }
  };

  // Eliminar producto del carrito
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: productId, quantity: 0 }), // Eliminar producto
      });

      if (!response.ok) {
        throw new Error('Error eliminando producto');
      }

      // Filtrar el producto eliminado del carrito
      const updatedCart = cart.filter(item => item.product_id !== productId);
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  // Confirmar compra
  const handleConfirmPurchase = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/confirm`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al confirmar la compra');
      }

      const result = await response.json();
      setMessage(result.message);
      setCart([]);
    } catch (error) {
      console.error('Error confirmando la compra:', error);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {message && <div>{message}</div>}
      <div>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cart.map(item => (
            <div key={item.product_id}>
              <h3>{products.find(p => p.id === item.product_id)?.name}</h3>
              <p>Precio: ${products.find(p => p.id === item.product_id)?.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleRemoveQuantity(item.product_id)}>-</button>
              <button onClick={() => handleAddQuantity(item.product_id)}>+</button>
              <button onClick={() => handleRemoveProduct(item.product_id)}>Eliminar</button> {/* Eliminar producto */}
            </div>
          ))
        )}
      </div>
      <div>Total: ${total}</div>
      <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
    </div>
  );
};

export default Cart;


