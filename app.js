let currentService = 'super';

// Establecer fecha por defecto (Hoy)
document.getElementById('deliveryDate').valueAsDate = new Date();

// Cambiar formulario según el servicio seleccionado
function selectService(service) {
    currentService = service;

    // Actualizar estilo visual de los botones
    const buttons = document.querySelectorAll('.service-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const formTitle = document.getElementById('formTitle');
    const dynamicFields = document.getElementById('dynamicFields');

    switch (service) {
        case 'super':
            formTitle.textContent = '🛒 Pedido de Supermercado';
            dynamicFields.innerHTML = `
                <label for="details">Lista de Compras / Productos:</label>
                <textarea id="details" rows="4" placeholder="Ej: 1L Leche, 1kg Pan, Detergente..." required></textarea>
                <label for="marketName">Supermercado Preferido (Opcional):</label>
                <input type="text" id="marketName" placeholder="Ej: Supermercado Central">
            `;
            break;

        case 'delivery':
            formTitle.textContent = '🛵 Moto Delivery (Punto a Punto)';
            dynamicFields.innerHTML = `
                <label for="pickup">Dirección de Retiro:</label>
                <input type="text" id="pickup" placeholder="Ej: Calle Comercio 456" required>
                <label for="details">¿Qué llevamos / traemos?:</label>
                <input type="text" id="details" placeholder="Ej: Llaves, Taper de comida, Paquete" required>
            `;
            break;

        case 'mandados':
            formTitle.textContent = '📋 Mandados y Trámites';
            dynamicFields.innerHTML = `
                <label for="details">Descripción detallada del Mandado:</label>
                <textarea id="details" rows="3" placeholder="Ej: Ir a la farmacia y comprar Ibuprofeno 400mg..." required></textarea>
            `;
            break;

        case 'servicios':
            formTitle.textContent = '💳 Pago de Servicios';
            dynamicFields.innerHTML = `
                <label for="details">Servicio a Pagar y Detalles:</label>

                <textarea id="details" rows="3" placeholder="Ej: Factura de Luz / Gas. Tienen la factura impresa o paso número de cliente." required></textarea>
            `;
            break;

        case 'turnos':
            formTitle.textContent = '📅 Reserva de Turnos';
            dynamicFields.innerHTML = `
                <label for="details">Lugar o Profesional y Tramite a realizar:</label>
                <input type="text" id="details" placeholder="Ej: Turno para la Peluquería / Taller Mecánico" required>
            `;
            break;
        }
}

// Guardar y mostrar pedidos
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const details = document.getElementById('details').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('deliveryDate').value;
    const time = document.getElementById('deliveryTime').value;
    const phone = document.getElementById('phone').value;

    const orderList = document.getElementById('orderList');

    if (orderList.querySelector('.empty-msg')) {
        orderList.innerHTML = '';
    }

    const orderCard = document.createElement('div');
    orderCard.classList.add('order-item');
    orderCard.innerHTML = `
        <p><strong>Service:</strong> ${currentService.toUpperCase()}</p>
        <p><strong>Detalle:</strong> ${details}</p>
        <p><strong>Dirección:</strong> ${address}</p>
        <p><strong>Programado para:</strong> 📅 ${date} a las ⏰ ${time}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Estado:</strong> 🟡 Pendiente de Confirmación</p>
    `;

    orderList.prepend(orderCard);
    document.getElementById('orderForm').reset();
    document.getElementById('deliveryDate').valueAsDate = new Date();
});