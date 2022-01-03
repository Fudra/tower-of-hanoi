import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { RootState, BaseState } from "../types"


export enum BaseMutations {
    SET_ABOUT_MODAL_STATE = "SET_ABOUT_MODAL_STATE",
}


const state: BaseState = {
    aboutModalState: true
}


const getters: GetterTree<BaseState, RootState> = {
    isModalAboutOpen(state): Boolean {
        return state.aboutModalState;
    }
}


const actions: ActionTree<BaseState, RootState> = {
    openAboutModal({ commit }): void {
        commit(BaseMutations.SET_ABOUT_MODAL_STATE, true)
    },
    closeAboutModal({ commit }): void {
        commit(BaseMutations.SET_ABOUT_MODAL_STATE, false)
    },
    toggleAboutModal({ commit, state }): void {
        commit(BaseMutations.SET_ABOUT_MODAL_STATE, !state.aboutModalState)
    }
}

const mutations: MutationTree<BaseState> = {
    [BaseMutations.SET_ABOUT_MODAL_STATE](state, value: Boolean) {
        state.aboutModalState = value;
    },
}

export const base: Module<BaseState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

