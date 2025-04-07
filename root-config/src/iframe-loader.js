// src/iframe-loader.js
export function bootstrap(props) {
    return Promise.resolve();
}

export function mount(props) {
    return new Promise((resolve, reject) => {
        const container = document.getElementById('angular5-container');
        if (!container) {
            reject(new Error('Container not found'));
            return;
        }

        // Crear y configurar el iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'http://localhost:4201'; // URL donde se ejecuta tu app Angular 5
        iframe.style.width = '100%';
        iframe.style.height = '100vh'; // altura total de la ventana
        iframe.style.border = 'none';

        // Función para manejar cuando el iframe ha cargado
        iframe.onload = () => {
            resolve();
        };

        // Limpiar el contenedor y añadir el iframe
        container.innerHTML = '';
        container.appendChild(iframe);
    });
}

export function unmount(props) {
    const container = document.getElementById('angular5-container');
    if (container) {
        container.innerHTML = '';
    }
    return Promise.resolve();
}