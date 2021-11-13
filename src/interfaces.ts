export interface Position {
    [index: number]: number;
}

export interface Vector3D {
    [index: string]: number | null;
}


export interface GameMove {
    from: Number;
    to: Number;
}

export interface GameState {
    peg: Position
}
