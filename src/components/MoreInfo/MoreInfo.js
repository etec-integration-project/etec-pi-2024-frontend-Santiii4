import React from 'react';
import '../MoreInfo/MoreInfo.css';

const MoreInfo = () => {
  return (
    <div className="more-info-container">
      <h1>Más Información</h1>
      <p>
        Aquí encontrarás más información acerca de nuestra empresa, servicios, y cómo contactarnos.
      </p>
      <section className="more-info-section">
        <h2>Contactanos</h2>
        <p>Email: contacto@empresa.com</p>
        <p>Teléfono: +34 600 123 456</p>
      </section>
      <section className="more-info-section">
        <h2>Dirección</h2>
        <p>Calle Falsa 123, 28080 Madrid, España</p>
      </section>
      <section className="more-info-section">
        <h2>Horarios</h2>
        <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
        <p>Sábado: 10:00 AM - 2:00 PM</p>
        <p>Domingo: Cerrado</p>
      </section>
    </div>
  );
};

export default MoreInfo;
