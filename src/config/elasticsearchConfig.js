module.exports = {
    node: process.env.ELASTICSEARCH_NODE || 'https://localhost:9200',
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
        password: process.env.ELASTICSEARCH_PASSWORD || '5cHW37Y6*7Pl+XDqgwOs' 
    },
    tls: {
        rejectUnauthorized: false
    }
};