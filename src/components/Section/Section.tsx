import { For, Show, createMemo } from 'solid-js';
import { useData } from '@store';
import type { T_Section, T_DraggableData } from '@consts';
import {
    Link,
    EditSectionButton,
    NewLinkButton,
    IconTrash,
    LinkOverlay,
} from '@components';
import {
    createDroppable,
    createSortable,
    SortableProvider,
} from '@thisbeyond/solid-dnd';

import styles from './Section.module.css';

export const SectionOverlay = (props: { section: T_Section }) => {
    return (
        <div
            style={{
                'background-color':
                    'hsl(from var(--color-surface-base) h s l / 80%)',
                'backdrop-filter': 'blur(2px)',
                'pointer-events': 'none',
            }}
            class={styles.SectionContainer}
        >
            <div class={styles.SectionHeaderContainer}>
                <div class={styles.SectionHeaderActions}>
                    <span class='drag-handler'>⠿</span>
                    <p>{props.section.name}</p>
                </div>
            </div>
        </div>
    );
};

export const Section = (props: { section: T_Section }) => {
    const data = useData();
    const sortable = createSortable(props.section.id, {
        type: 'section',
        data: props.section,
    } as T_DraggableData);

    const handleRemoveSection = () => {
        data.setStore('sections', (sections) =>
            sections.filter((section) => section.id !== props.section.id),
        );
    };

    const isReceivingLink = createMemo(() => {
        const overData = data.dragHoverState();
        if (!overData) return false;

        const source = overData.source;
        const dest = overData.dest;

        if (source.type !== 'link' || dest.type !== 'link') return false;

        return (
            source.parentSectionId !== props.section.id &&
            dest.parentSectionId === props.section.id
        );
    });

    return (
        <div
            ref={sortable.ref}
            style={{
                transform: `translate3d(${sortable.transform.x}px, ${sortable.transform.y}px, 0)`,
                'z-index': sortable.isActiveDraggable ? 1 : 0,
                opacity: sortable.isActiveDraggable ? 0.5 : 1,
                outline:
                    sortable.isActiveDraggable || isReceivingLink()
                        ? 'var(--size-border-medium) dashed var(--color-button-primary)'
                        : '',
                'pointer-events': sortable.isActiveDraggable ? 'none' : 'auto',
            }}
            class={styles.SectionContainer}
        >
            <div class={styles.SectionHeaderContainer}>
                <div class={styles.SectionHeaderActions}>
                    <Show when={data.editMode()}>
                        <span class='drag-handler' {...sortable.dragActivators}>
                            ⠿
                        </span>
                    </Show>
                    <p>{props.section.name}</p>
                </div>
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
                <SortableProvider ids={props.section.links.map((l) => l.id)}>
                    <For each={props.section.links}>
                        {(link) => (
                            <Link sectionID={props.section.id} link={link} />
                        )}
                    </For>
                </SortableProvider>
            </div>
        </div>
    );
};
