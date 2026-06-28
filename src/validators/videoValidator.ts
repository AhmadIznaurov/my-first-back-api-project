import { VALID_RESOLUTIONS } from '../models/videos';


export type ValidationError = {
    field: string;
    message: string;
};

export function validateParamsId() {

}

export function validateCreateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
    }

    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
        errors.push({ field: 'author', message: 'Author is required and must be a non-empty string.' });
    }

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


    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim() === '')) {
        errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
    }

    if (data.availableResolutions !== undefined) {
        if (!Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
            errors.push({ field: 'availableResolutions', message: 'Available resolutions must be a non-empty array.' });
        } else {
            const invalid = data.availableResolutions.filter((r: any) => !VALID_RESOLUTIONS.includes(r)); //todo
            if (invalid.length > 0) {
                errors.push({
                    field: 'availableResolutions',
                    message: `Invalid values: ${invalid.join(', ')}. Valid values are: ${VALID_RESOLUTIONS.join(', ')}.`
                });
            }
        }
    }



    return errors;
}