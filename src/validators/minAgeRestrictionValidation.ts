

export type minAgeRestrictionError = {
    field: string;
    message: string;
}

export function minAgeRestrictionValidation(data: any): minAgeRestrictionError[] {
    const errors: minAgeRestrictionError[] = []

    // --- MIN AGE RESTRICTION ---
    if ((data.minAgeRestriction !== undefined && typeof data.minAgeRestriction === 'boolean') || data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be a number.'
        });
    }
    return errors;

}