import type { Component } from 'solid-js';
import Comp from './Comp';
import { DataProvider } from './store';
import { Nav, MainContent } from '@components';

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
