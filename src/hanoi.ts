const hanoi = (n: number, displayMove: (from: number, to:number))  => {
    hanoi_rec(n, 0, 2);
    const hanoiRec = (n:number, from: number, to: number) => {
        if (n == 1) {
            display_move(from, to);
            return;
        }
        const aux = 3 - from - to;
        hanoi_rec(n - 1, from, aux);
        display_move(from, to);
        hanoi_rec(n - 1, aux, to);
    }
})

export default hanoi;

