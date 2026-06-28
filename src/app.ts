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

const apiPrefix = '/hometask_01/api';


app.get(`${apiPrefix}/videos`, getAllVideos);
app.get('/videos', getAllVideos);

app.post(`${apiPrefix}/videos`, createVideo);
app.post('/videos', createVideo);

app.get(`${apiPrefix}/videos/:id`, getVideoById);
app.get('/videos/:id', getVideoById);

app.put(`${apiPrefix}/videos/:id`, updateVideo);
app.put('/videos/:id', updateVideo);

app.delete(`${apiPrefix}/videos/:id`, deleteVideo);
app.delete('/videos/:id', deleteVideo);

app.delete(`${apiPrefix}/testing/all-data`, clearAllData);
app.delete('/testing/all-data', clearAllData);

export default app;