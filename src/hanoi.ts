import { GameMove } from "./interfaces";

const hanoi = (n: number): Array<GameMove> => {
    const gameMoves: Array<GameMove> = []


    const hanoiRec = (n: number, from: number, to: number) => {
        if (n == 1) {
            gameMoves.push({from, to});
            return;
        }
        const aux = 3 - from - to;
        hanoiRec(n - 1, from, aux);
        gameMoves.push({from, to});
        hanoiRec(n - 1, aux, to);
    }

    hanoiRec(n, 0, 2);

    return gameMoves;
}

export default hanoi