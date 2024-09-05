import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Obtener productos y carrito
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        // Obtener productos desde el backend
        const productsResponse = await axios.get('http://localhost:5000/products');
        setProducts(productsResponse.data);

        // Obtener carrito desde el backend
        const cartResponse = await axios.get('http://localhost:5000/cart');
        setCart(cartResponse.data);

        // Calcular el total
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
      await axios.put('http://localhost:5000/cart/update', { id: productId, quantity: 1 });
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
      await axios.put('http://localhost:5000/cart/update', { id: productId, quantity: -1 });
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0); // Eliminar si la cantidad es 0
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
    } catch (error) {
      console.error('Error reduciendo cantidad:', error);
    }
  };

  // Eliminar producto
  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/remove/${productId}`);
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      calculateTotal(updatedCart, products);
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
              if (!product) return null; // Si el producto no existe
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
              <h5>Total: ${total.toFixed(2)}</h5>
              <button type="button" className="btn btn-primary btn-block">Proceder al Pago</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


