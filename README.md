# Technical Test: Elasticsearch Setup and Testing with Docker

---

## Summary

### Description

This technical test aims to assess the candidate's ability to set up an Elasticsearch environment using Docker and Docker Compose, validate the connection and authentication with Elasticsearch, and develop a Node.js script to perform both exact and fuzzy searches in Elasticsearch.

### Requirements

- Node.js v20.10.0
- Docker
- Docker Compose

### Objectives

1. Set up an Elasticsearch environment using Docker and Docker Compose.
2. Perform a connection and authentication test with Elasticsearch.
3. Develop a Node.js script to perform searches in Elasticsearch.

---

## Steps to Follow

1. **Clone the repository:**
   - Clone the repository using the command:

     ```bash
     git clone https://github.com/jumorap/ElasticsearchTechnicalTest
     ```

   - Navigate to the project directory with:

     ```bash
     cd ElasticsearchTechnicalTest
     ```

   - *NOTE: It is recommended to use a code editor to facilitate development and configuration.*

2. **Start Elasticsearch with Docker Compose:**
   - Ensure Docker is running on your device.
   - In the project directory, run the following command to start Elasticsearch in the background:

     ```bash
     docker compose up -d
     ```

3. **Configure Elasticsearch:**
   - To configure access to Elasticsearch, run the command:

     ```bash
     docker exec -it elasticsearch bin/elasticsearch-reset-password -u elastic
     ```

     - Confirm the action with "y" and press ENTER.
     - Copy the generated password and temporarily paste it into the `index.js` file.
   - Verify the connection to Elasticsearch using:

     ```bash
     curl -u elastic:your_password -X GET "https://localhost:9200/_cluster/health" --insecure
     ```

4. **Set up the Node.js project:**
   - In the project directory, install the dependencies with:

     ```bash
     npm i
     ```

   - Create a `.env` file with the necessary connection variables.
   - Develop and run the script to test the searches.

---

## Deliverables

- URL of the repository where the test was completed.
- Scripts required to solve the problem.
- File containing the fuzzy and exact search tests.
- Screenshots or logs demonstrating that searches were performed correctly.
- README instructions for using the solution.
- *NOTE: Do not include `.env`, only include a `.env.example` with undefined variables.*

### Expected

- A well-structured and clear README.md file.
- Organized, clean, and modular code.

### Evaluation Criteria

- **Functionality:** Does the API meet the requirements? Are the data indexed and searched correctly?
- **Efficiency:** Are the searches fast and well-optimized?
- **Error Handling:** How are common errors managed? Is the system robust?
- **Documentation:** Are the instructions easy to follow and is the code understandable?
- **Best Practices:** Does the code follow good development practices?
