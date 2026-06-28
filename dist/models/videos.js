"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = exports.VALID_RESOLUTIONS = void 0;
exports.VALID_RESOLUTIONS = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
class Video {
    constructor(data) {
        Object.assign(this, data);
    }
}
exports.Video = Video;
//ssh -R 80:localhost:5001 nokey@localhost.run
