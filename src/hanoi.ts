const hanoi = (n: number, displayMove: (from: number, to: number) => void) => {
    const hanoiRec = (n: number, from: number, to: number) => {
        if (n == 1) {
            displayMove(from, to);
            return;
        }
        const aux = 3 - from - to;
        hanoiRec(n - 1, from, aux);
        displayMove(from, to);
        hanoiRec(n - 1, aux, to);
    }

    hanoiRec(n, 0, 2);
}

export default hanoi;

