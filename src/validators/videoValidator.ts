import {VALID_RESOLUTIONS} from "../models/videos";

export type ValidationError = {
    field: string;
    message: string;
};

export function validateUpdateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // --- TITLE ---
    if (data.title !== undefined) {
        if (typeof data.title !== 'string') {
            errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
        } else {
            const trimmedTitle = data.title.trim();
            if (trimmedTitle === '') {
                errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
            } else if (trimmedTitle.length > 25) {
                errors.push({
                    field: 'title',
                    message: 'Title must not exceed 25 characters.'
                });
            }
        }
    }

    // --- AUTHOR ---
    if (data.author !== undefined) {
        if (typeof data.author !== 'string') {
            errors.push({ field: 'author', message: 'Author must be a non-empty string.' });
        } else {
            const trimmedAuthor = data.author.trim();
            if (trimmedAuthor === '') {
                errors.push({ field: 'author', message: 'Author must be a non-empty string.' });
            } else if (trimmedAuthor.length > 20) {
                errors.push({
                    field: 'author',
                    message: 'Author must not exceed 20 characters.'
                });
            }
        }
    }

    // --- PUBLICATION DATE ---
    if (data.publicationDate !== undefined) {
        if (typeof data.publicationDate !== 'string') {
            errors.push({
                field: 'publicationDate',
                message: 'Publication date must be a non-empty string.'
            });
        } else {
            const pubDate = data.publicationDate.trim();
            if (pubDate === '') {
                errors.push({
                    field: 'publicationDate',
                    message: 'Publication date must be a non-empty string.'
                });
            } else if (isNaN(Date.parse(pubDate))) {
                errors.push({
                    field: 'publicationDate',
                    message: 'Publication date is not a valid ISO date.'
                });
            }
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
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean value.'
        });
    }

    // --- AVAILABLE RESOLUTIONS ---
    if (data.availableResolutions !== undefined) {
        if (!Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
            errors.push({ field: 'availableResolutions', message: 'Available resolutions must be a non-empty array.' });
        } else {
            const invalid = data.availableResolutions.filter((r: any) => !VALID_RESOLUTIONS.includes(r));
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


export function validateUpdateVideo(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // --- TITLE -------
    if (data.title !== undefined) {
        // Сначала проверяем, является ли это строкой
        if (typeof data.title !== 'string') {
            errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
        } else {
            // Теперь безопасно вызываем .trim(), так как мы знаем, что это строка
            const trimmedTitle = data.title.trim();

            if (trimmedTitle === '') {
                errors.push({ field: 'title', message: 'Title must be a non-empty string.' });
            } else if (trimmedTitle.length > 25) {
                errors.push({
                    field: 'title',
                    message: 'Title must not exceed 25 characters.'
                });
            }
        }
    }

    // --- PUBLICATION DATE ---
    if (data.publicationDate !== undefined) {
        const pubDate = data.publicationDate;
        if (typeof pubDate !== 'string') {
            errors.push({
                field: 'publicationDate',
                message: 'Publication date must be a non-empty string.'
            });
        } else if (pubDate.trim() === '') {
            errors.push({
                field: 'publicationDate',
                message: 'Publication date must be a non-empty string.'
            });
        } else if (isNaN(Date.parse(pubDate))) {
            errors.push({
                field: 'publicationDate',
                message: 'Publication date is not a valid ISO date.'
            });
        }
    }

    // --- MIN AGE RESTRICTION ---jjj
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
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        //export function canBeDownloaded(data: any): canBeDownloadedError[] {   const errors: canBeDownloadedError[] = [];
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean value.'
        });

    }

    return errors;
}