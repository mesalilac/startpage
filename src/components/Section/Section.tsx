import { EditSectionButton, IconTrash, Link, NewLinkButton } from '@components';
import type { TdraggableData, Tsection } from '@consts';
import { useData } from '@store';
import { createSortable, SortableProvider } from '@thisbeyond/solid-dnd';
import { createMemo, For, Show } from 'solid-js';

import './Section.css';

export const SectionOverlay = (props: { section: Tsection }) => {
    return (
        <div
            class='section-container'
            style={{
                'background-color':
                    'hsl(from var(--color-surface-base) h s l / 80%)',
                'backdrop-filter': 'blur(2px)',
                'pointer-events': 'none',
            }}
        >
            <div class='section-header-container'>
                <div class='section-header-actions'>
                    <span class='drag-handler'>⠿</span>
                    <p>{props.section.name}</p>
                </div>
            </div>
        </div>
    );
};

export const Section = (props: { section: Tsection }) => {
    const data = useData();
    const sortable = createSortable(props.section.id, {
        type: 'section',
        data: props.section,
    } as TdraggableData);

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
            class='section-container'
            ref={sortable.ref}
            style={{
                transform: `translate3d(${sortable.transform.x}px, ${sortable.transform.y}px, 0)`,
                'z-index': sortable.isActiveDraggable ? 1 : 0,
                opacity: sortable.isActiveDraggable ? 0.5 : 1,
                outline:
                    sortable.isActiveDraggable || isReceivingLink()
                        ? 'var(--size-border-medium) dashed var(--color-button-primary)'
                        : '',
                'border-bottom':
                    props.section.links.length > 6
                        ? 'var(--size-border-medium) solid hsl(from var(--color-button-primary) h s l / 50%)'
                        : '',
                'pointer-events': sortable.isActiveDraggable ? 'none' : 'auto',
            }}
        >
            <div class='section-header-container'>
                <div class='section-header-actions'>
                    <Show when={data.editMode()}>
                        <span class='drag-handler' {...sortable.dragActivators}>
                            ⠿
                        </span>
                    </Show>
                    <p>{props.section.name}</p>
                </div>
                <div class='section-header-actions'>
                    <Show when={data.editMode()}>
                        <EditSectionButton sectionId={props.section.id} />
                        <IconTrash onClick={handleRemoveSection} />
                    </Show>
                    <NewLinkButton sectionId={props.section.id} />
                </div>
            </div>
            <div class='divider' />

            <div class='section-links-container'>
                <SortableProvider ids={props.section.links.map((l) => l.id)}>
                    <For each={props.section.links}>
                        {(link) => (
                            <Link link={link} sectionId={props.section.id} />
                        )}
                    </For>
                </SortableProvider>
            </div>
        </div>
    );
};
