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

  // Reducir cantidad
  const handleRemoveQuantity = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: productId, quantity: -1 }),
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

  // Verificar si el usuario está logueado antes de confirmar la compra
  const handleConfirmPurchase = async () => {
    const token = localStorage.getItem('authToken'); // Suponiendo que el token está guardado en localStorage

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cart/confirm`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }, // Enviar el token en el encabezado
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error al realizar la compra');
        return;
      }

      setMessage('Compra realizada con éxito');
      setCart([]);
      setTotal(0);
    } catch (error) {
      setMessage('Error al realizar la compra');
      console.error('Error en la compra:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {message && <p className="text-center" style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <div>
          {cart.map(item => {
            const product = products.find(p => p.id === item.product_id);
            return product ? (
              <div className="card mb-3" key={item.product_id}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Cantidad: {item.quantity} x ${product.price}</p>
                  </div>
                  <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleAddQuantity(item.product_id)}>+</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveQuantity(item.product_id)}>-</button>
                  </div>
                </div>
              </div>
            ) : null;
          })}
          <div className="text-end">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-success mt-3" onClick={handleConfirmPurchase}>Confirmar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;










