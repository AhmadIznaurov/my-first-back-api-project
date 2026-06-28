import express from 'express';
import { getAllVideos, createVideo, getVideoById, updateVideo, deleteVideo, clearAllData } from './controllers/videoController';
import {setupApp} from "./setup-app";


const app = express();
setupApp(app);

app.use(express.json());

const PORT = process.env.PORT || 5001;
console.log(process.env.PORT)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// todo переписать на роутеры
app.get('/videos', getAllVideos);
app.post('/videos', createVideo);

app.get('/videos/:id', getVideoById);
app.put('/videos/:id', updateVideo);


app.delete('/videos/:id', deleteVideo);
app.delete('/testing/all-data', clearAllData);

export default app;