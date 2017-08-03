import express = require("express");
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import debug = require('debug');
import http = require('http');

import { Routes } from "./routes/routes";

export class App{
    //Express instance
    static express = express();

    //Instance of the HTTP server
    static server:http.Server;

    //Port on which the HTTP server is running
    static port:number;

    public static configure():void{
        // view engine setup
        App.express.set('views', './views');
        App.express.set('view engine', 'pug');

        // uncomment after placing your favicon in /public
        //express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        App.express.use(logger('dev'));
        App.express.use(bodyParser.json());
        App.express.use(bodyParser.urlencoded({ extended: false }));
        App.express.use(cookieParser());
        App.express.use(express.static('./public'));

        App.express.use('/', Routes.index());

        // catch 404 and forward to error handler
        App.express.use(function(req:any, res:any, next:any) {
            var err = new Error('Not Found');
            //err.status = 404;
            next(err);
        });

        // error handler
        App.express.use(function(err:any, req:any, res:any, next:any) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        //Set debug to this server
        debug('express_ts_template:server');

        /**
         * Get port from environment and store in Express.
         */
        App.port = App.normalizePort(process.env.PORT || '3000');
        App.express.set('port', App.port);
    }

    public static startServer(port:number = App.port){
        App.server = http.createServer(App.express);
        App.server.listen(port);
        App.server.on('error', App.onError);
        App.server.on('listening', App.onListening);
    }

    public static normalizePort(val:any) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    private static onError(error:any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof App.port === 'string'
            ? 'Pipe ' + App.port
            : 'Port ' + App.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
            break;
            default:
                throw error;
        }
    }

    private static onListening() {
        let addr = App.server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}