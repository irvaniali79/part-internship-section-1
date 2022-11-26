const appsDirectoriesPath = "./apps";
const apps = ['employee'];

const root = __dirname;


const redis1 = {
    Client:{
        url:'redis://localhost:6379',
    },
    selectDB:0
}
const redis2 = {
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
    redis1,
    redis2,
    router,
    storage,
    server,
    errorHandler,
    responseHandler
}