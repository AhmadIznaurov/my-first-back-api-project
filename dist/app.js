"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("./controllers/videoController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// --- ROUTES ---
app.get('/videos', videoController_1.getAllVideos);
app.post('/videos', videoController_1.createVideo);
app.get('/videos/:id', videoController_1.getVideoById);
app.put('/videos/:id', videoController_1.updateVideo);
app.delete('/videos/:id', videoController_1.deleteVideo);
app.delete('/testing/all-data', videoController_1.clearAllData);
exports.default = app;
