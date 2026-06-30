import { VALID_RESOLUTIONS } from '../models/videos';


export type ValidationError = {
    field: string;
    message: string;
};


export function validateCreateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
    }
    // Блок 2:
    else if (data.title.trim().length > 20) {
        errors.push({
            field: 'title',
            message: 'Title must not exceed 20 characters.'
        });
    }

    // --- ПРОВЕРКА AUTHOR ---

    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '' || data.author.length > 20) {
        errors.push({ field: 'author', message: 'Author is required and must be a non-empty string.' });
    }
    if(!data.publicationDate || typeof data.publicationDate !== 'string' || !isNaN(Date.parse(data.publicationDate))) {
        errors.push({
                    field: 'publicationDate',
                    message: 'Author must not exceed 20 characters.'
                 });
    }


    // else if (typeof data.author === 'string' && data.author.trim().length > 20) {
    //     errors.push({
    //         field: 'author',
    //         message: 'Author must not exceed 20 characters.'
    //     });
    // }

    if (!data.availableResolutions || !Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
        errors.push({ field: 'availableResolutions', message: 'Available resolutions is required and must be a non-empty array.' });
    } else {
        const invalid = data.availableResolutions.filter((r: any) => !VALID_RESOLUTIONS.includes(r)); // todo
        if (invalid.length > 0) {
            errors.push({
                field: 'availableResolutions',
                message: `Invalid values: ${invalid.join(', ')}. Valid values are: ${VALID_RESOLUTIONS.join(', ')}.`
            });
        }
    }

    return errors;
}


export function validateUpdateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // --- TITLE ---
    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim() === '')) {
        errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
    } else if (data.title !== undefined && data.title.trim().length > 25) {
        errors.push({
            field: 'title',
            message: 'Title must not exceed 25 characters.'
        });
    }

    // --- AVAILABLE RESOLUTIONS ---
    if (data.availableResolutions !== undefined) {

    }

    // --- CAN BE DOWNLOADED ---
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean value.'
        });
    }

    // --- MIN AGE RESTRICTION ---
    if ((data.minAgeRestriction !== undefined && typeof data.minAgeRestriction === 'boolean') || data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be a number.'
        });
    }
    return errors;
}