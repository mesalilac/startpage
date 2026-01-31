import { For, Match, Show, Switch } from 'solid-js';
import { useData } from '@store';
import {
    DragDropProvider,
    DragDropSensors,
    DragEventHandler,
    DragOverlay,
    SortableProvider,
    mostIntersecting,
    closestCorners,
} from '@thisbeyond/solid-dnd';

import { Link, LinkOverlay, Section, SectionOverlay } from '@components';

import styles from './MainContent.module.css';
import { T_DraggableData, T_Link, T_Section } from '@consts';

export const MainContent = () => {
    const data = useData();

    const handleDragEnd: DragEventHandler = ({ draggable, droppable }) => {
        document.body.style.cursor = '';
        data.setDragHoverState(null);

        if (!droppable) return;

        const dragId = draggable.id;
        const dropId = droppable.id;
        if (dragId === dropId) return;

        const dragData = draggable.data as T_DraggableData;
        const dropData = droppable.data as T_DraggableData;

        if (dragData.type === 'link' && dropData.type === 'section') return;

        // reorder sections
        const fromSectionIdx = data.store.sections.findIndex(
            (s) => s.id === dragId,
        );
        const toSectionIdx = data.store.sections.findIndex(
            (s) => s.id === dropId,
        );

        if (fromSectionIdx !== -1 || toSectionIdx !== -1) {
            const updatedSections = [...data.store.sections];
            const [movedSection] = updatedSections.splice(fromSectionIdx, 1);
            updatedSections.splice(toSectionIdx, 0, movedSection);
            data.setStore('sections', updatedSections);
            return;
        }

        // reorder links (in section or to another section)
        let sourceSectionIdx = -1;
        let sourceLinkIdx = -1;

        data.store.sections.forEach((s, sIdx) => {
            const lIdx = s.links.findIndex((l) => l.id === dragId);
            if (lIdx !== -1) {
                sourceSectionIdx = sIdx;
                sourceLinkIdx = lIdx;
            }
        });

        let destSectionIdx = data.store.sections.findIndex(
            (s) => s.id === dropId,
        );
        let destLinkIdx = -1;

        if (destSectionIdx === -1) {
            data.store.sections.forEach((s, sIdx) => {
                const lIdx = s.links.findIndex((l) => l.id === dropId);
                if (lIdx !== -1) {
                    destSectionIdx = sIdx;
                    destLinkIdx = lIdx;
                }
            });
        }

        if (sourceSectionIdx !== -1 && destSectionIdx !== -1) {
            data.setStore('sections', (sections) => {
                const result = [...sections];
                const movingLink =
                    result[sourceSectionIdx].links[sourceLinkIdx];

                const sourceLinks = [...result[sourceSectionIdx].links];
                sourceLinks.splice(sourceLinkIdx, 1);
                result[sourceSectionIdx] = {
                    ...result[sourceSectionIdx],
                    links: sourceLinks,
                };

                const targetLinks = [...result[destSectionIdx].links];
                const insertIdx =
                    destLinkIdx === -1 ? targetLinks.length : destLinkIdx;
                targetLinks.splice(insertIdx, 0, movingLink);
                result[destSectionIdx] = {
                    ...result[destSectionIdx],
                    links: targetLinks,
                };

                return result;
            });
        }
    };

    const handleDragOver: DragEventHandler = ({ draggable, droppable }) => {
        if (!droppable) return;

        data.setDragHoverState({
            source: draggable.data as T_DraggableData,
            dest: droppable.data as T_DraggableData,
        });
    };

    return (
        <DragDropProvider
            onDragStart={() => (document.body.style.cursor = 'grabbing')}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetector={closestCorners}
        >
            <DragDropSensors />
            <div class={styles.mainContentContainer}>
                <SortableProvider ids={data.store.sections.map((s) => s.id)}>
                    <For each={data.store.sections}>
                        {(section) => <Section section={section} />}
                    </For>
                </SortableProvider>
            </div>
            <DragOverlay>
                {(draggable) => {
                    if (!draggable) return;

                    const dragData = draggable.data as T_DraggableData;

                    if (dragData.type === 'section') {
                        return <SectionOverlay section={dragData.data} />;
                    } else if (dragData.type === 'link') {
                        return (
                            <LinkOverlay
                                sectionID={dragData.parentSectionId}
                                link={dragData.data}
                            />
                        );
                    }
                }}
            </DragOverlay>
        </DragDropProvider>
    );
};
