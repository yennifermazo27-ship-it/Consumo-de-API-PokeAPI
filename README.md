# PokémonesApi

Aplicación Angular v19 que consume la PokéAPI y muestra un listado de Pokémon con su información de detalle.

## Tecnologías usadas
- Angular v19
- RxJS (switchMap, forkJoin, map, catchError, debounceTime)
- HttpClient
- TypeScript
- PokéAPI

## Requisitos previos
Antes de ejecutar el proyecto asegúrate de tener instalado:
- Node.js (versión 18 o superior)
- Angular CLI

## Instalación

1. Clona el repositorio:
git clone https://github.com/tu-usuario/PokemonesApi.git

2. Entra a la carpeta del proyecto:
cd PokemonesApi

3. Instala las dependencias:
npm install

4. Ejecuta el proyecto:
ng serve

5. Abre el navegador en:
http://localhost:4200

## Características
- Listado de 20 Pokémon por página
- Tarjetas con imagen, nombre, ID, altura, peso, experiencia y tipo
- Paginación con botones anterior y siguiente
- Búsqueda de Pokémon por nombre con debounce
- Detalle de tipo al hacer clic en el tipo de un Pokémon
- Estado de carga mientras se obtienen los datos
- Manejo de errores visible en pantalla

## Estructura del proyecto
src/app/
├── core/
├── features/
│   └── pokemon/
│       ├── components/pokemon-card/
│       ├── model/
│       ├── pages/pokemon-list/
│       ├── services/
│       └── pokemon.module.ts
├── shared/
└── app.module.ts

Yennifer Mazo Montoya
ADSO 3231651
03/07/2026