import {
    clearAllData,
    createVideo,
    deleteVideo,
    getAllVideos,
    getVideoById,
    updateVideo
} from "../controllers/videoController";
import {Router} from "express";

export const videoControlRouter = Router({})




videoControlRouter.get('/', getAllVideos);
videoControlRouter.post('/', createVideo);

videoControlRouter.get('/:id', getVideoById);
videoControlRouter.put('/:id', updateVideo);


videoControlRouter.delete('/:id', deleteVideo);
videoControlRouter.delete('/', clearAllData);