import type { Accessor, JSX, Setter } from 'solid-js';

import { createContext, createSignal, useContext } from 'solid-js';
import type { SetStoreFunction } from 'solid-js/store';
import { createStore } from 'solid-js/store';

import dataJson from '../public/data.json';
import type { Tdata, TdraggableData } from './consts';

type TactiveOver = {
    source: TdraggableData;
    dest: TdraggableData;
} | null;

const createDataStore = () => {
    const [store, setStore] = createStore<Tdata>(dataJson);
    const [editMode, setEditMode] = createSignal(false);
    const [dragHoverState, setDragHoverState] = createSignal<TactiveOver>(null);

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
    dragHoverState: Accessor<TactiveOver>;
    setDragHoverState: Setter<TactiveOver>;
    store: Tdata;
    setStore: SetStoreFunction<Tdata>;
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
