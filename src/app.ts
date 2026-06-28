import express from 'express';
import { getAllVideos, createVideo, getVideoById, updateVideo, deleteVideo, clearAllData } from './controllers/videoController';


const app = express();
// const BASE_PATH = '/hometask_01';

app.use(express.json());

// --- ROUTES ---
app.get('/videos', getAllVideos);
app.post('/videos', createVideo);
app.get('/videos/:id', getVideoById);
app.put('/videos/:id', updateVideo);
app.delete('/videos/:id', deleteVideo);
app.delete('/testing/all-data', clearAllData);

export default app;