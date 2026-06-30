"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const videoControlRoutes_1 = require("./routes/videoControlRoutes");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
app.use(express_1.default.json());
const PORT = process.env.PORT || 5001;
//console.log(process.env.PORT)
app.use('/videos', videoControlRoutes_1.videoControlRouter);
app.use('/videos/:id', videoControlRoutes_1.videoControlRouter);
app.use('/testing/all-data', videoControlRoutes_1.videoControlRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
