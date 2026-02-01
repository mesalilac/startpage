import { MainContent, Nav } from '@components';
import type { Component } from 'solid-js';
import { DataProvider } from './store';

import './App.css';

const App: Component = () => {
    return (
        <DataProvider>
            <div class='main-container'>
                <Nav />
                <MainContent />
            </div>
        </DataProvider>
    );
};

export default App;
