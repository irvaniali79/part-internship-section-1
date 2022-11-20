const appsDirectoriesPath = "./apps";
const apps = ['users'];

const root = __dirname;

const database = {
    user:'postgres',
    password:"postgres",
    host:"localhost",
    port:5432,
    schema:"testdb",
};
const redis = {
    Client:{
        url:'redis://localhost:6379',
    },
    selectDB:0
}
const router = {
  eventName: "event",
}

const storage = {
    root : "./storage"
}

const server = {
    port: process.env.PORT ?? 81,
    hostname: process.env.HOST ?? "127.0.0.1",
    eventName: "event",
}

const errorHandler = {
    eventName:'catch-error'
}

const responseHandler = {
    eventName:'send-response'
}

module.exports = {
    appsDirectoriesPath,
    apps,
    root,
    database,
    redis,
    router,
    storage,
    server,
    errorHandler,
    responseHandler
}