# proyecto-sistemas-operativos
proyecto de sistemas operativos para docker

Frontend – Curador de Roadmaps Tech

Este directorio contiene el frontend del Curador de Roadmaps, una interfaz sencilla donde el usuario escribe qué quiere aprender (por ejemplo, “Quiero aprender React”) y recibe un roadmap generado automáticamente por el backend.

Está diseñado para ser simple, entendible y fácil de integrar con cualquier API.

📌 Objetivo del Frontend

El frontend permite:

Enviar una consulta sobre qué quiere aprender el usuario.

Recibir un roadmap generado automáticamente.

Mostrarlo de forma clara en pantalla.

Es una herramienta ligera para visualizar la salida del sistema de curación de roadmaps. 🎨 Función principal (App.js)

El frontend:

Permite escribir una consulta:
"Quiero aprender React"

Envía esa consulta al backend (POST).

Obtiene un roadmap como lista de pasos.

Muestra el resultado en la página.