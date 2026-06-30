import { Request, Response } from 'express';
import { Video } from '../models/videos';
import { validateCreateVideo, validateUpdateVideo } from '../validators/videoValidator';


let videos: Video[] = [];
let currentId = 1;

// --- GET ALL ---
export const getAllVideos = (req: Request, res: Response) => {
    res.status(200).json(videos);
};

// --- CREATE ---
export const createVideo = (req: Request, res: Response) => {
    const errors = validateCreateVideo(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors });
    }

    const resolutionsInput = req.body.availableResolutions;
    const availableResolutions = Array.isArray(resolutionsInput) ? resolutionsInput : [resolutionsInput];

    const body = req.body || {};
    let date;
    const newVideo = new Video({

        id: currentId++,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded === undefined ? false : !!req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction === undefined ? null : req.body.minAgeRestriction,
        createdAt: new Date().toISOString(),
        publicationDate:  date.setDate(date.getDate() + 1),
    });

    videos.push(newVideo);
    res.status(201).json(newVideo);
};

// --- GET BY ID ---
export const getVideoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string); // todo
    const video = videos.find((v: any) => v.id === id); //todo

    if (!video) {
        return res.sendStatus(404);
    }

    res.status(200).json(video);
};

// --- UPDATE ---
export const updateVideo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string); // todo
    const videoIndex = videos.findIndex((v: any) => v.id === id); //todo

    if (videoIndex === -1) {
        return res.sendStatus(404); // Видео не найдено
    }


    const errors = validateUpdateVideo(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors }); // ИСПРАВЛЕНО: Ключ с заглавной M
    }

    const updatedVideoData = { ...videos[videoIndex], ...req.body };
    videos[videoIndex] = updatedVideoData;

    res.sendStatus(204);
};

// --- DELETE ---
export const deleteVideo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string); // todo
    const videoIndex = videos.findIndex((v: any) => v.id === id); //todo

    if (videoIndex === -1) {
        return res.sendStatus(404); // Видео не найдено
    }

    videos.splice(videoIndex, 1);
    res.sendStatus(204);
};

// --- CLEAR DATABASE (TESTING) ---
export const clearAllData = (_req: Request, res: Response) => {
    videos = [];
    currentId = 1;
    res.sendStatus(204);
};