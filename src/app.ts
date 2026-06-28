import express from 'express';
import { getAllVideos, createVideo, getVideoById, updateVideo, deleteVideo, clearAllData } from './controllers/videoController';


const app = express();
const BASE_PATH = '/hometask_01/api';

app.use(express.json());

// --- ROUTES ---
app.get(`${BASE_PATH}/videos`, getAllVideos);
app.post(`${BASE_PATH}/videos`, createVideo);
app.get(`${BASE_PATH}/videos/:id`, getVideoById);


app.put(`${BASE_PATH}/videos/:id`, updateVideo);
app.delete(`${BASE_PATH}/videos/:id`, deleteVideo);
app.delete(`${BASE_PATH}/testing`, clearAllData);

export default app;