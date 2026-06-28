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
const apiPrefix = '/hometask_01/api';
app.delete(`${apiPrefix}/`, videoController_1.clearAllData);
app.delete('/testing/all-data', videoController_1.clearAllData);
app.get(`${apiPrefix}/videos`, videoController_1.getAllVideos);
app.get('/videos', videoController_1.getAllVideos);
app.post(`${apiPrefix}/videos`, videoController_1.createVideo);
app.post('/videos', videoController_1.createVideo);
app.get(`${apiPrefix}/videos/:id`, videoController_1.getVideoById);
app.get('/videos/:id', videoController_1.getVideoById);
app.put(`${apiPrefix}/videos/:id`, videoController_1.updateVideo);
app.put('/videos/:id', videoController_1.updateVideo);
app.delete(`${apiPrefix}/videos/:id`, videoController_1.deleteVideo);
app.delete('/videos/:id', videoController_1.deleteVideo);
exports.default = app;
