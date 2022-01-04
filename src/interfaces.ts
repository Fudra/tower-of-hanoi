export interface Position {
    [index: number]: number;
}

export interface Vector3D {
    [index: string]: number | null;
}


export interface GameMove {
    from: number;
    to: number;
}

export interface GameState {
    peg: Position
}
