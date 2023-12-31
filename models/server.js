const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // ? Middlewares
        this.middlewares();

        // ? Conectar a la base de datos
        this.conectarDB();

        // * rutas de mi aplicacion
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        // ? Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico 
        this.app.use( express.static('public') )
    }

    async conectarDB() {
        await dbConnection();
    }


    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor en puerto ', this.port)
        });
    }


}

module.exports = Server;