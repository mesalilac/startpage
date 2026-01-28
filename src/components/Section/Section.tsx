import { For, Show } from 'solid-js';
import { useData } from '@store';
import type { T_Section } from '@consts';
import { Link, EditSectionButton, NewLinkButton, IconTrash } from '@components';

import styles from './Section.module.css';

export const Section = (props: { section: T_Section }) => {
    const data = useData();

    const handleRemoveSection = () => {
        data.setStore('sections', (sections) =>
            sections.filter((section) => section.id !== props.section.id),
        );
    };

    return (
        <div class={styles.SectionContainer}>
            <div class={styles.SectionHeaderContainer}>
                <p>{props.section.name}</p>
                <div class={styles.SectionHeaderActions}>
                    <Show when={data.editMode()}>
                        <EditSectionButton sectionID={props.section.id} />
                        <IconTrash onClick={handleRemoveSection} />
                    </Show>
                    <NewLinkButton sectionID={props.section.id} />
                </div>
            </div>
            <div class='divider' />

            <div class={styles.SectionLinksContainer}>
                <For each={props.section.links}>
                    {(link) => (
                        <Link sectionID={props.section.id} link={link} />
                    )}
                </For>
            </div>
        </div>
    );
};
