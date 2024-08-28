

# Elasticsearch Technical Test

Este proyecto implementa una API para realizar búsquedas en Elasticsearch utilizando Node.js y Express.

## Requisitos

- Node.js v20.10.0
- Docker
- Docker Compose

2. **La API estará disponible en** `http://localhost:3000`


# Documentación del Proyecto: Elasticsearch Technical Test


## El Proceso de Desarrollo

### Configuración Inicial

Lo primero que hice fue configurar el entorno de desarrollo. Docker para Elasticsearch. hubo alguno dolor de cabeza en cuanto a la instalación y configuración local. junto con el docker-compose,  ahora siguiendo las siguientes instrucciones:
 
## Configuración

1. **Clona el repositorio:**

   
   git clone https://github.com/wallblue4/ElasticSearch-technical-test.git
   cd ElasticsearchTechnicalTest
   

2. **Instala las dependencias:**

   
   npm install
  

3. **Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:**

   
   ELASTICSEARCH_NODE=https://localhost:9200
   ELASTICSEARCH_USERNAME=elastic
   ELASTICSEARCH_PASSWORD=tu_contraseña
  

4. **Inicia Elasticsearch con Docker Compose:**

   docker-compose up -d

## Uso

1. **Inicia el servidor:**


   npm start


### Creación de la Estructura del Proyecto

Decidí seguir una estructura modular para el proyecto:

- `src/` para el código fuente
- `config/` para las configuraciones
- `services/` para la lógica de negocio
- `utils/` para utilidades comunes como los errores
- `controllers/` para controladores de rutas

Esta estructura me ayudó a mantener el código organizado y fácil de navegar.

### Implementación de las Funcionalidades

1. **Indexación de Usuarios**: 
   Esta parte fue relativamente sencilla. Lo más desafiante fue asegurarme de que el índice se creara correctamente si no existía, contando con que al relanzar el script se reindexan todos los usuarios en la imagen de Docker.

2. **Búsqueda Exacta**:
  Se realizo una activadad de investigacion en la documentacion de Elasticsearch para entender mejor las diferencias entre las consultas exactas y las de fuzzy.

3. **Búsqueda Fuzzy**:
   para estea busqueda la investifación se realizó en la documentación de Elasticsearch, pero también en la documentación de Node.js para entender mejor las diferencias entre las consultas exactas y las de fuzzy. usando operadores como or en el caso de las búsquedas fuzzy , con el fin de obtener busquedas con multiples palabras felixibles , manejando en algunos casos el rango de error por defecto , como el caso del "age" permitiendo un rango de error de 1-2 años.

### Implementación de las api

1. **Búsqueda Exacta**:
   
   La api que se utiliza para realizar la búsqueda exacta es la siguiente:
   
   ```http
   GET /users/searchExact?name=Alice Johnson
   ```
   
   Esta api recibe un parámetro o varios como el caso `name` que es el nombre del usuario que se desea buscar. La api devuelve un objeto JSON con la información del usuario o de los usuarios si se encuentra, o un error si no se encuentra ningún usuario con ese nombre.

2. **Búsqueda Fuzzy**:

   La api que se utiliza para realizar la búsqueda fuzzy es la siguiente:

   ```http
   GET /users/searchFuzzy?name=Alce
   ```

   Esta api recibe un parámetro llamado `name` que es el nombre del usuario que se desea buscar. La api devuelve un objeto JSON con la información del usuario o de los usuarios si se encuentra, o un error si no se encuentra ningún usuario con ese nombre.

3. **Obtener todos los usuarios**:

   La api que se utiliza para obtener todos los usuarios es la siguiente:

   ```http
   GET /users
   ```

   Esta api devuelve un objeto JSON con la información de todos los usuarios.

## Autor

- [Juan Medina] - [jmedinapi@unal.edu.co]