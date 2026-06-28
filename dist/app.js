"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("./controllers/videoController");
const app = (0, express_1.default)();
const BASE_PATH = '/hometask_01';
app.use(express_1.default.json());
// --- ROUTES ---
app.get(`${BASE_PATH}/videos`, videoController_1.getAllVideos);
app.post(`${BASE_PATH}/videos`, videoController_1.createVideo);
app.get(`${BASE_PATH}/videos/:id`, videoController_1.getVideoById);
app.put(`${BASE_PATH}/videos/:id`, videoController_1.updateVideo);
app.delete(`${BASE_PATH}/videos/:id`, videoController_1.deleteVideo);
app.delete(`${BASE_PATH}/testing/all-data`, videoController_1.clearAllData);
exports.default = app;
