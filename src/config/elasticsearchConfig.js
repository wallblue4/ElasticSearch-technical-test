module.exports = {
    node: process.env.ELASTICSEARCH_NODE || 'https://localhost:9200',
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'usernameElastic',
        password: process.env.ELASTICSEARCH_PASSWORD || 'password' 
    },
    tls: {
        rejectUnauthorized: false
    }
};