import express from 'express';
import { getAllVideos, createVideo, getVideoById, updateVideo, deleteVideo, clearAllData } from './controllers/videoController';
import {setupApp} from "./setup-app";


const app = express();
setupApp(app);

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// --- ROUTES ---
app.get('/hometask_01/api/videos', getAllVideos);
app.post('/hometask_01/api/videos', createVideo);
app.get('/hometask_01/api/videos/:id', getVideoById);
app.put('/hometask_01/api/videos/:id', updateVideo);
app.delete('/hometask_01/api/videos/:id', deleteVideo);
app.delete('/hometask_01/api/testing/all-data', clearAllData);



export default app;