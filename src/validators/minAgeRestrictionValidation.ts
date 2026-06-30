import {ValidationError} from "./videoValidator";


export function minAgeRestrictionValidation(data: any): ValidationError[] {
    const errors: ValidationError[] = []

    // --- MIN AGE RESTRICTION ---
    if ((data.minAgeRestriction !== undefined && typeof data.minAgeRestriction === 'boolean') || data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be a number.'
        });
    }
    return errors;

}