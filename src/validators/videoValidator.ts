import { VALID_RESOLUTIONS } from '../models/videos';

export type ValidationError = {
    field: string;
    message: string;
};

export function validateCreateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // --- TITLE ---
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
    } else if (data.title.trim().length > 25) { // Обратите внимание: лимит 25 символов!
        errors.push({
            field: 'title',
            message: 'Title must not exceed 25 characters.'
        });
    }

    // --- AUTHOR ---
// Проверяем только если поле author было прислано в запросе
    if (data.author !== undefined) {
        if (typeof data.author !== 'string' || data.author.trim() === '') {
            errors.push({ field: 'author', message: 'Author must be a non-empty string.' });
        } else {
            if (data.author.trim().length > 20) {
                errors.push({
                    field: 'author',
                    message: 'Author must not exceed 20 characters.'
                });
            }
        }
    }
    // --- AVAILABLE RESOLUTIONS ---
    if (!data.availableResolutions || !Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
        errors.push({ field: 'availableResolutions', message: 'Available resolutions is required and must be a non-empty array.' });
    } else {
        const invalid = data.availableResolutions.filter((r: any) => !VALID_RESOLUTIONS.includes(r));
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

    // --- TITLE -------
    // if (data.title !== undefined) {
    //     // Сначала проверяем, является ли это строкой
    //     if (typeof data.title !== 'string') {
    //         errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
    //     } else {
    //         // Теперь безопасно вызываем .trim(), так как мы знаем, что это строка
    //         const trimmedTitle = data.title.trim();
    //
    //         if (trimmedTitle === '') {
    //             errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
    //         } else if (trimmedTitle.length > 25) {
    //             errors.push({
    //                 field: 'title',
    //                 message: 'Title must not exceed 25 characters.'
    //             });
    //         }
    //     }
    // }

    // --- PUBLICATION DATE ---
    if (data.publicationDate !== undefined) {
        const pubDate = data.publicationDate;
        if (typeof pubDate !== 'string' || pubDate.trim() === '') {
            errors.push({
                field: 'publicationDate',
                message: 'Publication date must be a non-empty string.'
            });
        } else if (isNaN(Date.parse(pubDate))) { // Фикс логики
            errors.push({
                field: 'publicationDate',
                message: 'Publication date is not a valid ISO date.'
            });
        }
    }

    // --- MIN AGE RESTRICTION ---
    if (data.minAgeRestriction !== undefined) {
        if (typeof data.minAgeRestriction !== 'number') {
            errors.push({
                field: 'minAgeRestriction',
                message: 'Must be a number.'
            });
        } else if (data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
            errors.push({
                field: 'minAgeRestriction',
                message: 'Must be between 1 and 18.'
            });
        }
    }

    // --- CAN BE DOWNLOADED ---
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'true') {
        errors.push({
            field: 'title',
            message: 'Must be a boolean value.'
        });
    } else if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'false') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean value.'
        });
    }

    return errors;
}