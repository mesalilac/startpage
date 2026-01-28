import { For } from 'solid-js';
import { useData } from '@store';

import { Section } from '@components';

import styles from './MainContent.module.css';

export const MainContent = () => {
    const data = useData();

    return (
        <div class={styles.mainContentContainer}>
            <For each={data.store.sections}>
                {(section) => <Section section={section} />}
            </For>
        </div>
    );
};
