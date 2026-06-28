"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllData = exports.deleteVideo = exports.updateVideo = exports.getVideoById = exports.createVideo = exports.getAllVideos = void 0;
const videos_1 = require("../models/videos");
const videoValidator_1 = require("../validators/videoValidator");
let videos = [];
let currentId = 1;
// --- GET ALL ---
const getAllVideos = (req, res) => {
    res.status(200).json(videos);
};
exports.getAllVideos = getAllVideos;
// --- CREATE ---
const createVideo = (req, res) => {
    const errors = (0, videoValidator_1.validateCreateVideo)(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors });
    }
    const resolutionsInput = req.body.availableResolutions;
    const availableResolutions = Array.isArray(resolutionsInput) ? resolutionsInput : [resolutionsInput];
    const body = req.body || {};
    const newVideo = new videos_1.Video({
        id: currentId++,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: availableResolutions, // <-- Используем наш "исправленный" вариант
        canBeDownloaded: req.body.canBeDownloaded === undefined ? true : req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction === undefined ? null : req.body.minAgeRestriction,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
    });
    videos.push(newVideo);
    res.status(201).json(newVideo);
};
exports.createVideo = createVideo;
// --- GET BY ID ---
const getVideoById = (req, res) => {
    const id = parseInt(req.params.id); // todo
    const video = videos.find(v => v.id === id);
    if (!video) {
        return res.sendStatus(404);
    }
    res.status(200).json(video);
};
exports.getVideoById = getVideoById;
// --- UPDATE ---
const updateVideo = (req, res) => {
    const id = parseInt(req.params.id); // todo
    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
        return res.sendStatus(404); // Видео не найдено
    }
    const errors = (0, videoValidator_1.validateUpdateVideo)(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors }); // ИСПРАВЛЕНО: Ключ с заглавной M
    }
    const updatedVideoData = Object.assign(Object.assign({}, videos[videoIndex]), req.body);
    videos[videoIndex] = updatedVideoData;
    res.sendStatus(204);
};
exports.updateVideo = updateVideo;
// --- DELETE ---
const deleteVideo = (req, res) => {
    const id = parseInt(req.params.id); // todo
    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
        return res.sendStatus(404); // Видео не найдено
    }
    videos.splice(videoIndex, 1);
    res.sendStatus(204);
};
exports.deleteVideo = deleteVideo;
// --- CLEAR DATABASE (TESTING) ---
const clearAllData = (_req, res) => {
    videos = [];
    currentId = 1;
    res.sendStatus(204);
};
exports.clearAllData = clearAllData;
