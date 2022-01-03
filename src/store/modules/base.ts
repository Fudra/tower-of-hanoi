import { GetterTree, ActionTree, MutationTree, Module } from "vuex"
import { RootState, BaseState } from "../types"


export enum BaseMutations {
    SET_ABOUT_MODAL_STATE = "SET_ABOUT_MODAL_STATE",
    SET_CONTROLS_MODAL_STATE = "SET_CONTROLS_MODAL_STATE",
}


const state: BaseState = {
    aboutModalState: false,
    controlModalState: true,
}


const getters: GetterTree<BaseState, RootState> = {
    isModalAboutOpen(state): Boolean {
        return state.aboutModalState;
    },
    isModalControlOpen(state): Boolean {
        return state.controlModalState;
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
    },
    openAControlodal({ commit }): void {
        commit(BaseMutations.SET_CONTROLS_MODAL_STATE, true)
    },
    closeControlModal({ commit }): void {
        commit(BaseMutations.SET_CONTROLS_MODAL_STATE, false)
    },
    toggleControlModal({ commit, state }): void {
        commit(BaseMutations.SET_CONTROLS_MODAL_STATE, !state.controlModalState)
    },
    closeAllModals({ dispatch }): void {
        dispatch("closeAboutModal");
        dispatch("closeControlModal");
    }
}

const mutations: MutationTree<BaseState> = {
    [BaseMutations.SET_ABOUT_MODAL_STATE](state, value: Boolean) {
        state.aboutModalState = value;
    },
    [BaseMutations.SET_CONTROLS_MODAL_STATE](state, value: Boolean) {
        state.controlModalState = value;
    },
}

export const base: Module<BaseState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

