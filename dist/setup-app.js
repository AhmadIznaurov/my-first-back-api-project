"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const setupApp = (app) => {
    // app.use(express.json()); // middleware для парсинга JSON в теле запроса
    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!333");
    });
    return app;
};
exports.setupApp = setupApp;
