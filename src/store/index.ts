import { InjectionKey } from 'vue'
import { createStore, createLogger, useStore as baseUseStore, Store } from "vuex";
import { RootState } from './types'
import game from './modules/game'


export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
    modules: {
        game
    },
    strict: true,
    plugins: [createLogger()]
})

export function useStore() {
    return baseUseStore(key);
}