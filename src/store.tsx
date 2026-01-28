import {
    createSignal,
    Accessor,
    Setter,
    JSX,
    createContext,
    useContext,
} from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';
import type { T_Data } from './consts';

import data_json from '@data';

const createDataStore = () => {
    const [store, setStore] = createStore<T_Data>(data_json);
    const [editMode, setEditMode] = createSignal(false);

    return {
        editMode: editMode,
        setEditMode: setEditMode,
        store: store,
        setStore: setStore,
    };
};

const AppContext = createContext<{
    editMode: Accessor<boolean>;
    setEditMode: Setter<boolean>;
    store: T_Data;
    setStore: SetStoreFunction<T_Data>;
}>();

export const useData = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }

    return context;
};

export function DataProvider(props: { children: JSX.Element }) {
    const dataStore = createDataStore();

    return (
        <AppContext.Provider value={dataStore}>
            {props.children}
        </AppContext.Provider>
    );
}
