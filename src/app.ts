import express from 'express';
import { getAllVideos, createVideo, getVideoById, updateVideo, deleteVideo, clearAllData } from './controllers/videoController';


const app = express();
//
//
app.use(express.json());

// --- ROUTES ---
app.get('/hometask_01/api/videos', getAllVideos);
app.post('/hometask_01/api/videos', createVideo);
app.get('/hometask_01/api/videos/:id', getVideoById);
app.put('/hometask_01/api/videos/:id', updateVideo);
app.delete('/hometask_01/api/videos/:id', deleteVideo);
app.delete('/hometask_01/api/testing/all-data', clearAllData);

export default app;