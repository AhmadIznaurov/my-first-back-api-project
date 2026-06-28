"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("./controllers/videoController");
const setup_app_1 = require("./setup-app");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
app.use(express_1.default.json());
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// --- ROUTES ---
app.get('/hometask_01/api/videos', videoController_1.getAllVideos);
app.post('/hometask_01/api/videos', videoController_1.createVideo);
app.get('/hometask_01/api/videos/:id', videoController_1.getVideoById);
app.put('/hometask_01/api/videos/:id', videoController_1.updateVideo);
app.delete('/hometask_01/api/videos/:id', videoController_1.deleteVideo);
app.delete('/hometask_01/api/testing/all-data', videoController_1.clearAllData);
exports.default = app;
