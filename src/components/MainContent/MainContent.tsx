import { LinkOverlay, Section, SectionOverlay } from '@components';
import type { TdraggableData } from '@consts';
import { useData } from '@store';
import type { DragEventHandler } from '@thisbeyond/solid-dnd';
import {
    closestCorners,
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    SortableProvider,
} from '@thisbeyond/solid-dnd';
import { For } from 'solid-js';
import './MainContent.css';

export const MainContent = () => {
    const data = useData();

    const handleDragEnd: DragEventHandler = ({ draggable, droppable }) => {
        document.body.style.cursor = '';
        data.setDragHoverState(null);

        if (!droppable) return;

        const dragId = draggable.id;
        const dropId = droppable.id;
        if (dragId === dropId) return;

        const dragData = draggable.data as TdraggableData;
        const dropData = droppable.data as TdraggableData;

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
            source: draggable.data as TdraggableData,
            dest: droppable.data as TdraggableData,
        });
    };

    const handleDragStart: DragEventHandler = () => {
        document.body.style.cursor = 'grabbing';
    };

    return (
        <DragDropProvider
            collisionDetector={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
        >
            <DragDropSensors />
            <div class='main-content-container'>
                <SortableProvider ids={data.store.sections.map((s) => s.id)}>
                    <For each={data.store.sections}>
                        {(section) => <Section section={section} />}
                    </For>
                </SortableProvider>
            </div>
            <DragOverlay>
                {(draggable) => {
                    if (!draggable) return;

                    const dragData = draggable.data as TdraggableData;

                    if (dragData.type === 'section') {
                        return <SectionOverlay section={dragData.data} />;
                    } else if (dragData.type === 'link') {
                        return (
                            <LinkOverlay
                                link={dragData.data}
                                sectionId={dragData.parentSectionId}
                            />
                        );
                    }
                }}
            </DragOverlay>
        </DragDropProvider>
    );
};
