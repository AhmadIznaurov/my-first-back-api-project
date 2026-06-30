export const VALID_RESOLUTIONS = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export interface Video {
    id: number | string | any;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: number | null;
    createdAt: string; // ISO Date    {[new Date().toISOString()]}
    publicationDate: string; // ISO Date
    availableResolutions: string[];
}

export class Video {
    constructor(data: any) {
        Object.assign(this, data);
    }
}