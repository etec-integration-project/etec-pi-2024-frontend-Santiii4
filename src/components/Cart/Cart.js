import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(''); // Estado para manejar el mensaje de éxito o rechazo

  // Obtener productos y carrito
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        const productsResponse = await axios.get(`http://backend:8000/products`);
        setProducts(productsResponse.data);

        const cartResponse = await axios.get(`http://backend:8000/cart`);
        setCart(cartResponse.data);

        calculateTotal(cartResponse.data, productsResponse.data);
      } catch (error) {
        console.error('Error al obtener productos o carrito:', error);
      }
    };
    
    fetchProductsAndCart();
  }, []);

  // Calcular el total
  const calculateTotal = (cartItems, productList) => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const product = productList.find(p => p.id === item.id);
      return product ? sum + (product.price * item.quantity) : sum;
    }, 0);
    setTotal(totalPrice);
  };

  // Añadir cantidad
  const handleAddQuantity = async (productId) => {
    try {
      await axios.put(`http://backend:8000/cart/update`, { id: productId, quantity: 1 });
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
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
      await axios.put(`http://backend:8000/cart/update`, { id: productId, quantity: -1 });
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
    } catch (error) {
      console.error('Error reduciendo cantidad:', error);
    }
  };

  // Confirmar la compra
  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post(`http://backend:8000/cart/confirm`);
      setMessage(response.data.message); // Mostrar mensaje de éxito
      setCart([]); // Vaciar carrito
      setTotal(0); // Reiniciar total
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error al realizar la compra'); // Mostrar mensaje de error
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
            const product = products.find(p => p.id === item.id);
            return product ? (
              <div className="card mb-3" key={item.id}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Cantidad: {item.quantity} x ${product.price}</p>
                  </div>
                  <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleAddQuantity(item.id)}>+</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveQuantity(item.id)}>-</button>
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





