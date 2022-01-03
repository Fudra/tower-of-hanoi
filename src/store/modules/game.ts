import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { RootState, GameState } from "../types"


export enum GameMutations {
    SET_MOVES = "SET_MOVES",
}


const state: GameState = {
    moves: []
}


const getters: GetterTree<GameState, RootState> = {

}


const actions: ActionTree<GameState, RootState> = {

}

const mutations: MutationTree<GameState> = {
    [GameMutations.SET_MOVES](state, payload) {
        state.moves = payload;
    }
}

export const game: Module<GameState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
