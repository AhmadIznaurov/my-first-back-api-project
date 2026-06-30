import express from 'express';
import {setupApp} from "./setup-app";
import {videoControlRouter} from "./routes/videoControlRoutes";


const app = express();
setupApp(app);

app.use(express.json());

const PORT = process.env.PORT || 5001;
console.log(process.env.PORT)



app.use('/videos', videoControlRouter)
app.use('/videos/:id', videoControlRouter)
app.use('/testing/all-data', videoControlRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;