const http = require('http');
const ON_DEATH = require('death')({ SIGHUP: true });
const settings = require('./settings/settings');

class Server {

    constructor() {
        this.httpServer = null;
        this.isProcessExit = false;
        this.setProcess();
        this.initiate();
        this.run();
    }

    initiate() {
        const { NODE_ENV, SERVER_PORT } = settings;
        this.httpServer = http.createServer(this.app);
        this.httpServer.listen(SERVER_PORT);
        this.httpServer.on('error', (error) => {
            if (error.syscall === 'listen') {
                let errorMessage = null;
                switch (error.code) {
                    case 'EACCES': {
                        errorMessage = `port ${SERVER_PORT} requires elevated privileges`;
                        break;
                    }
                    case 'EADDRINUSE': {
                        errorMessage = `port ${SERVER_PORT} is already in use`;
                        break;
                    }
                }
                if (errorMessage) {
                    console.log(errorMessage);
                }
            }
            throw (error);
        });

        this.httpServer.on('listening', () => {
            this.log(`The server is now listening to port ${SERVER_PORT}. The server is now running on ${NODE_ENV} environment.`);
        });
    }

    setProcess() {
        process.on('uncaughtException', (error) => {
            console.log(error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.log(reason);
            console.log(promise);
        });
    }

    run() {
        setTimeout(() => {
            console.log(process.argv[2]);
            //console.log(process.stdout);

            //console.log(`isRestarted: ${process}`);
            process.exit(2);
            //process.kill(process.pid, 'SIGKILL'); // this will cause forever to restart the script.

            /*             setTimeout(() => {
                            process.kill(process.pid, 'SIGTERM');  // this will cause forever to stop the script.
                        }, 1000); */
        }, 1000);
    }

    log(text) {
        console.log(`===${text}===`);
    }
}

new Server();