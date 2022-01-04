export interface RootState {}


export interface BaseState {
    aboutModalState: Boolean,
    controlModalState: Boolean,
}

export interface GameState {
    moves: Array<any>,
    ringCount: Array<Number>,
    rings: Number,
}