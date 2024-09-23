const { MongoClient } = require('mongodb'); // este db se está conectando a mi colección E IMPORTAMOS LA CLASE 

const client = new MongoClient('mongodb+srv:'); // Completar con su cliente

client.connect()
.then(
    (response) => {
        console.log('La conexión a la deb es correcta');
    },
    (error) => {
        console.error('error:'+error);
    }
);

module.exports = client;