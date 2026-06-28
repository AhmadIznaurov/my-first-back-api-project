"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamsId = validateParamsId;
exports.validateCreateVideo = validateCreateVideo;
exports.validateUpdateVideo = validateUpdateVideo;
const videos_1 = require("../models/videos");
function validateParamsId() {
}
function validateCreateVideo(data) {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
    }
    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
        errors.push({ field: 'author', message: 'Author is required and must be a non-empty string.' });
    }
    if (!data.availableResolutions || !Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
        errors.push({ field: 'availableResolutions', message: 'Available resolutions is required and must be a non-empty array.' });
    }
    else {
        const invalid = data.availableResolutions.filter((r) => !videos_1.VALID_RESOLUTIONS.includes(r)); // todo
        if (invalid.length > 0) {
            errors.push({
                field: 'availableResolutions',
                message: `Invalid values: ${invalid.join(', ')}. Valid values are: ${videos_1.VALID_RESOLUTIONS.join(', ')}.`
            });
        }
    }
    return errors;
}
function validateUpdateVideo(data) {
    const errors = [];
    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim() === '')) {
        errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
    }
    if (data.availableResolutions !== undefined) {
        if (!Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
            errors.push({ field: 'availableResolutions', message: 'Available resolutions must be a non-empty array.' });
        }
        else {
            const invalid = data.availableResolutions.filter((r) => !videos_1.VALID_RESOLUTIONS.includes(r)); //todo
            if (invalid.length > 0) {
                errors.push({
                    field: 'availableResolutions',
                    message: `Invalid values: ${invalid.join(', ')}. Valid values are: ${videos_1.VALID_RESOLUTIONS.join(', ')}.`
                });
            }
        }
    }
    return errors;
}
