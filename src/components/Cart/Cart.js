import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Llamada a la API para obtener productos
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Llamada a la API para obtener el carrito
    fetch('/cart')
      .then(res => res.json())
      .then(data => {
        setCart(data);
        calculateTotal(data);
      });
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product.price * item.quantity);
    }, 0);
    setTotal(totalPrice);
  };

  const handleAddQuantity = async (productId) => {
    try {
      const response = await axios.post(`/api/cart/${productId}/add`);
      // Manejar la respuesta del servidor aquí
      console.log('Cantidad añadida:', response.data);
    } catch (error) {
      console.error('Error añadiendo cantidad:', error);
    }
  };

  const handleRemoveQuantity = async (productId) => {
    try {
      const response = await axios.post(`/api/cart/${productId}/remove`);
      // Manejar la respuesta del servidor aquí
      console.log('Cantidad reducida:', response.data);
    } catch (error) {
      console.error('Error reduciendo cantidad:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/${productId}`);
      // Manejar la respuesta del servidor aquí
      console.log('Producto eliminado:', response.data);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h4 className="mb-3">Carrito de Compras</h4>
          <ul className="list-group mb-3">
            {cart.map((item, index) => {
              const product = products.find(p => p.id === item.id);
              return (
                <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{product.name}</h6>
                    <small className="text-muted">{product.description || 'Descripción breve'}</small>
                  </div>
                  <span className="text-muted">${product.price}</span>
                  <div>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleRemoveQuantity(item.id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleAddQuantity(item.id)}>+</button>
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-danger ml-3" onClick={() => handleRemoveProduct(item.id)}>Eliminar</button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="mb-0">Resumen del Pedido</h4>
            </div>
            <div className="card-body">
              <h5>Total: ${total}</h5>
              <button type="button" className="btn btn-primary btn-block">Proceder al Pago</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

