import {
    createSignal,
    Accessor,
    Setter,
    JSX,
    createContext,
    useContext,
} from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';
import type { T_Data, T_DraggableData } from './consts';

import data_json from '../public/data.json';
import { Id } from '@thisbeyond/solid-dnd';

type T_ActiveOver = {
    source: T_DraggableData;
    dest: T_DraggableData;
} | null;

const createDataStore = () => {
    const [store, setStore] = createStore<T_Data>(data_json);
    const [editMode, setEditMode] = createSignal(false);
    const [dragHoverState, setDragHoverState] =
        createSignal<T_ActiveOver>(null);

    return {
        editMode: editMode,
        setEditMode: setEditMode,
        dragHoverState: dragHoverState,
        setDragHoverState: setDragHoverState,
        store: store,
        setStore: setStore,
    };
};

const AppContext = createContext<{
    editMode: Accessor<boolean>;
    setEditMode: Setter<boolean>;
    dragHoverState: Accessor<T_ActiveOver>;
    setDragHoverState: Setter<T_ActiveOver>;
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
