## Instrucciones para instalar y ejecutar el proyecto

* Comando para instalar dependencias

npm run install

* Comando para levantar la aplicación

npm run dev

## Informe Técnico

Para el desarrollo de la aplicación se uso un enfoque basado en Arquitectura Modular para dividir las diferentes características a nivel de lógica del negocio.

Para cada módulo se genera un folder que aborda un problema del dominio de la lógica del negocio. En este caso un folder para la authenticación, carrito de compras y productos. De esta manera se separa responsabilidades concierne a un problema en específico.

Cada módulo a su vez, está compuesto por una serie de componentes dividos en diferentes folders que abordan cada aspecto de aplicación, tales como:

- Interfaz de Usuario
- Servicios que gestionan la recuperación de los datos
- Repositorios que funcionan entre puente entre la interfaz de usuario y la recuperación de datos.

* Gestión de estados

Para gestión de estados globales se utilizó Pinia.





