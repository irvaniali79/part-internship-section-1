const appsDirectoriesPath = "./apps";
const apps = ['employee'];

const root = __dirname;

const userData = {
    Client:{
        url:'redis://localhost:6379',
    },
    selectDB:0
}
const userParent = {
    Client:{
        url:'redis://localhost:6379',
    },
    selectDB:1
}

const router = {
  eventName: "event",
}

const storage = {
    root : "./storage"
}

const server = {
    port: process.env.PORT ?? 8000,
    hostname: process.env.HOST ?? "127.0.0.1",
    eventName: "event",
    origin : "localhost:4001",
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
    userData,
    userParent,
    router,
    storage,
    server,
    errorHandler,
    responseHandler
}