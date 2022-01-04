import { Position } from "../interfaces";

// All colors are borrowed form the tailwindCSS Documentation
export const COLORS = [
    // red-500
    0xEF4444,
    // yellow-500
    0xF59E0B,
    // green-500
    0x10B981,
    // blue-500,
    0x3B82F6,
    // indigo-500
    0x6366F1,
    // purple-500
    0x8B5CF6,
    // pink-500
    0xEC4899,
     // default
];


const PEG_SPACER = 90;

export const PEG_POSITION: Array<number> = [-PEG_SPACER, 0, PEG_SPACER];
export const RING_SIZE: Array<number> = [45, 40, 35, 30, 25, 20, 15, 10];
export const RING_HEIGHT = 6;

export const ANIM_DURATION = 4;
export const MAX_HEIGHT = 90;