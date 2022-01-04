import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { RootState, GameState } from "../types"


export enum GameMutations {
    SET_MOVES = "SET_MOVES",
    SET_RINGS = "SET_RINGS"
}


const state: GameState = {
    moves: [],
    rings: 6,
    ringCount: [3, 4, 5, 6, 7, 8],
}


const getters: GetterTree<GameState, RootState> = {
    getRings( state ) : Number {
        return state.rings;
    },
    getRingCount( state ) : Array<Number> {
        return state.ringCount;
    }
}


const actions: ActionTree<GameState, RootState> = {
    setRings({ commit }, rings):void {
        commit(GameMutations.SET_RINGS, rings)
    }
 }

const mutations: MutationTree<GameState> = {
    [GameMutations.SET_MOVES](state, payload) {
        state.moves = payload;
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
