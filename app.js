let currentService = 'super';
let sendMethod = 'whatsapp';

// Configurar teléfono de la empresa (reemplazar por el número real)
const PHONE_NUMBER = "5492344474452"; 

function selectService(service, btn) {
    currentService = service;
    
    // Cambiar estado activo en los botones
    document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const dynamicFields = document.getElementById('dynamicFields');
    const formTitle = document.getElementById('formTitle');

    if (service === 'super') {
        formTitle.textContent = "🛒 Pedido de Supermercado";
        dynamicFields.innerHTML = `
            <label for="details">Lista de Compras / Productos:*</label>
            <textarea id="details" rows="3" placeholder="Ej: 1L Leche, 1kg Pan, Detergente..." required></textarea>
            <label for="market">Supermercado de Preferencia (Opcional):</label>
            <input type="text" id="market" placeholder="Ej: Anónima, Dia, Chino centro...">
        `;
    } else if (service === 'delivery') {
        formTitle.textContent = "🛵 Retiro y Entrega de Paquetes";
        dynamicFields.innerHTML = `
            <label for="details">¿Qué tenemos que retirar y entregar?:*</label>
            <textarea id="details" rows="3" placeholder="Ej: Retirar llaves en la oficina y llevar a domicilio..." required></textarea>
            <label for="pickupAddress">Dirección de Retiro:*</label>
            <input type="text" id="pickupAddress" placeholder="Ej: Av. Rivadavia 1200" required>
        `;
    } else if (service === 'mandados') {
        formTitle.textContent = "📋 Mandados Varios";
        dynamicFields.innerHTML = `
            <label for="details">Descripción del Mandado:*</label>
            <textarea id="details" rows="3" placeholder="Ej: Comprar remedios en la farmacia de turno..." required></textarea>
        `;
    } else if (service === 'servicios') {
        formTitle.textContent = "💳 Pago de Servicios / Facturas";
        dynamicFields.innerHTML = `
            <label for="details">Detalle de las facturas a pagar:*</label>
            <textarea id="details" rows="3" placeholder="Ej: Factura de Luz y Gas..." required></textarea>
        `;
    } else if (service === 'turnos') {
        formTitle.textContent = "📅 Gestión de Turnos";
        dynamicFields.innerHTML = `
            <label for="details">Lugar / Médico donde sacar turno:*</label>
            <textarea id="details" rows="3" placeholder="Ej: Pedir turno para médico clínico en Sanatorio..." required></textarea>
        `;
    }
}

function setSendMethod(method) {
    sendMethod = method;
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const details = document.getElementById('details').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('deliveryDate').value;
    const time = document.getElementById('deliveryTime').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes')?.value || 'Ninguna';

    const orderId = Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
        id: orderId,
        service: currentService,
        details: details,
        address: address,
        date: date,
        time: time,
        phone: phone,
        notes: notes,
        status: 'Pendiente'
    };

    // Guardar en LocalStorage
    let orders = JSON.parse(localStorage.getItem('alToqueOrders')) || [];
    orders.push(newOrder);
    localStorage.setItem('alToqueOrders', JSON.stringify(orders));

    // Renderizar en el historial del cliente
    renderClientOrders();

    if (sendMethod === 'whatsapp') {
        let msg = `*NUEVO PEDIDO - AL TOQUE (#${orderId})*\n\n`;
        msg += `*Servicio:* ${currentService}\n`;
        msg += `*Detalles:* ${details}\n`;
        msg += `*Dirección:* ${address}\n`;
        msg += `*Fecha/Horario:* ${date} (${time})\n`;
        msg += `*Teléfono:* ${phone}\n`;
        msg += `*Notas:* ${notes}\n`;

        const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    } else {
        openModal("¡Pedido Enviado por Email!", "Tu solicitud fue registrada de prueba correctamente.");
    }
});

function renderClientOrders() {
    const orders = JSON.parse(localStorage.getItem('alToqueOrders')) || [];
    const container = document.getElementById('orderList');

    if (orders.length === 0) {
        container.innerHTML = '<p class="empty-msg">No tienes pedidos activos en esta sesión.</p>';
        return;
    }

    container.innerHTML = '';
    orders.forEach(o => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <p><strong>#ID:</strong> ${o.id} | <strong>Servicio:</strong> ${o.service}</p>
            <p><strong>Detalle:</strong> ${o.details}</p>
            <p><strong>Horario:</strong> ${o.date} - ${o.time}</p>
            <p><strong>Estado:</strong> <span class="badge-status status-pendiente">${o.status}</span></p>
        `;
        container.appendChild(div);
    });
}

function openModal(title, desc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Cargar pedidos guardados al iniciar
window.onload = function() {
    renderClientOrders();
};
