import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { GameMove } from "../../interfaces";
import { RootState, GameState } from "../types"


export enum GameMutations {
    RESET_GAME = "RESET_GAME",
    ADD_MOVES = "ADD_MOVES",
    SET_RINGS = "SET_RINGS"
}


const state: GameState = {
    moves: [],
    rings: 6,
    ringCount: [3, 4, 5, 6, 7, 8],
}


const getters: GetterTree<GameState, RootState> = {
    getRings(state): Number {
        return state.rings;
    },
    getRingCount(state): Array<Number> {
        return state.ringCount;
    },
    getGameMoves(state): Array<GameMove> {
        return state.moves;
    }
}


const actions: ActionTree<GameState, RootState> = {
    setRings({ commit }, rings): void {
        commit(GameMutations.SET_RINGS, rings)
    },

    setGameMoves({ commit }, move: GameMove): void {
        commit(GameMutations.ADD_MOVES, move);
    },

    resetGame({ commit }): void {
        commit(GameMutations.RESET_GAME);
    }
}

const mutations: MutationTree<GameState> = {
    [GameMutations.RESET_GAME](state) {
        state.moves = [];
    },
    [GameMutations.ADD_MOVES](state, move) {
        state.moves.push(...move);
    },
    [GameMutations.SET_RINGS](state, rings) {
        state.rings = rings;
    }
}

export const game: Module<GameState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
