import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { RootState, GameState } from "../types"


const state: GameState = {

}


const getters: GetterTree<GameState, RootState> = {

}


const actions: ActionTree<GameState, RootState> = {

}

const mutations: MutationTree<GameState> = {

}

const game: Module<GameState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

export default game;