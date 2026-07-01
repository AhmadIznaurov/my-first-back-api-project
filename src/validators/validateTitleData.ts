import {ValidationError} from "./videoValidator";


export function validateTitleData(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // --- TITLE ---
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push({field: 'title', message: 'Title is required and must be a non-empty string.'});
    } else if (data.title.trim().length > 25) {
        errors.push({
            field: 'title',
            message: 'Title must not exceed 25 characters.'
        });
    }
    return errors
}

//
//