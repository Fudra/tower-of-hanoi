import { GameMove } from "../interfaces";

export interface RootState {}


export interface BaseState {
    aboutModalState: Boolean,
    controlModalState: Boolean,
}

export interface GameState {
    moves: Array<GameMove>,
    ringCount: Array<Number>,
    rings: Number,
}