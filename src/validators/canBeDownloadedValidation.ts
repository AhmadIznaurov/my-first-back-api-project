import {ValidationError} from "./videoValidator";


export function canBeDownloadedValidation(data: any): ValidationError[] {
    const errors: ValidationError[] = []

    // --- CAN BE DOWNLOADED ---
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean value.'
        });
    }
    return errors;
}