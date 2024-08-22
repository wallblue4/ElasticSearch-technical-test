# Prueba Técnica: Configuración y Prueba de Elasticsearch en Docker

---

## Summary

### Description

Esta prueba técnica tiene como objetivo calificar las habilidades del candidato para configurar un entorno de Elasticsearch utilizando Docker y Docker Compose, validar la conexión y autenticación con Elasticsearch, y desarrollar un script en Node.js para realizar búsquedas tanto exactas como fuzzy en Elasticsearch.

### Requisitos

- Node.js v20.10.0.
- Docker.
- Docker Compose.

### Objetivo

1. Configurar un entorno de Elasticsearch utilizando Docker y Docker Compose.
2. Realizar una prueba de conexión y autenticación con Elasticsearch.
3. Desarrollar un script Node.js para realizar búsquedas en Elasticsearch.

---

## Pasos a seguir

1. **Clonar el repositorio:**
   - Clona el repositorio con el comando:

     ```bash
     git clone https://github.com/jumorap/ElasticsearchTechnicalTest
     ```

   - Navega a la carpeta del proyecto con:

     ```bash
     cd ElasticsearchTechnicalTest
     ```

   - *NOTA: Se recomienda utilizar un editor de código para facilitar el desarrollo y configuración.*

2. **Levantar Elasticsearch con Docker Compose:**
   - Asegúrate de que Docker esté en ejecución en tu dispositivo.
   - En el directorio del proyecto, ejecuta el siguiente comando para iniciar Elasticsearch en segundo plano:

     ```bash
     docker compose up -d
     ```

3. **Configurar Elasticsearch:**
   - Para configurar el acceso a Elasticsearch, ejecuta el comando:

     ```bash
     docker exec -it elasticsearch bin/elasticsearch-reset-password -u elastic
     ```

      - Confirma la acción con "y" y presiona ENTER.
      - Copia la contraseña generada y pégala temporalmente en el archivo `index.js`.
   - Verifica la conexión a Elasticsearch usando:

     ```bash
     curl -u elastic:your_password -X GET "https://localhost:9200/_cluster/health" --insecure
     ```

4. **Configurar el proyecto Node.js:**
   - En el directorio del proyecto, instala las dependencias con:

     ```bash
     npm install
     ```

   - Crea un archivo `.env` con las variables necesarias para la conexión.
   - Desarrolla y ejecuta el script para probar las búsquedas.

---

## Entregables

- URL del respositorio donde se resolvió la prueba.
- Scripts necesarios para resolver el problema.
- Archivo con las pruebas de búsqueda fuzzy y exacta.
- Capturas de pantalla o logs que demuestren que las búsquedas se realizaron correctamente.
- Instructivo README para hacer uso de la solución.
- *NOTA: No incluir .env, solo incluir un .env.example con variables no definidas*.

### Se espera

- Un archivo README.md bien estructurado y claro.
- Código organizado, limpio y modularizado.

### Criterios de Evaluación

- **Funcionalidad:** ¿La API cumple con los requisitos? ¿Los datos se indexan y se buscan correctamente?
- **Eficiencia:** ¿Las búsquedas son rápidas y están bien optimizadas?
- **Manejo de Errores:** ¿Cómo se manejan los errores comunes? ¿El sistema es robusto?
- **Documentación:** ¿Es fácil seguir las instrucciones y entender el código?
- **Buenas Prácticas:** ¿El código sigue buenas prácticas de desarrollo?
