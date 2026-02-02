import { EditLinkButton, IconTrash } from '@components';
import type { TdraggableData, Tlink } from '@consts';
import { useData } from '@store';
import { createSortable } from '@thisbeyond/solid-dnd';
import { generateFaviconUrl } from '@utils';
import type { JSX } from 'solid-js';
import { createMemo, Show } from 'solid-js';
import './Link.css';

export const LinkOverlay = (props: { sectionId: string; link: Tlink }) => {
    const faviconUrl = createMemo(() => {
        const url = new URL(props.link.url);
        return `./favicon/${url.hostname}.png`;
    });

    const faviconFallbackUrl = createMemo(() => {
        return generateFaviconUrl(props.link.url, 16);
    });

    const handleImgError: JSX.EventHandlerUnion<
        HTMLImageElement,
        ErrorEvent
    > = (e) => {
        e.currentTarget.src = faviconFallbackUrl();
    };

    return (
        <div
            class='link-container'
            style={{
                'background-color':
                    'hsl(from var(--color-surface-base) h s l / 80%)',
                'backdrop-filter': 'blur(2px)',
                'pointer-events': 'none',
            }}
            title={props.link.description}
        >
            <div class='flex-row'>
                <span class='drag-handler'>⠿</span>
                <a class='link-icon-name' href={props.link.url}>
                    <img
                        alt='Favicon'
                        onError={handleImgError}
                        src={faviconUrl()}
                    />
                    <p>{props.link.name}</p>
                </a>
            </div>
        </div>
    );
};

export const Link = (props: { sectionId: string; link: Tlink }) => {
    const data = useData();

    const sortable = createSortable(props.link.id, {
        type: 'link',
        data: props.link,
        parentSectionId: props.sectionId,
    } as TdraggableData);

    const handleRemoveLink = () => {
        data.setStore(
            'sections',
            (section) => section.id === props.sectionId,
            'links',
            (links) => links.filter((link) => link.id !== props.link.id),
        );
    };

    const faviconUrl = createMemo(() => {
        const url = new URL(props.link.url);
        return `./favicon/${url.hostname}.png`;
    });

    const faviconFallbackUrl = createMemo(() => {
        return generateFaviconUrl(props.link.url, 16);
    });

    const handleImgError: JSX.EventHandlerUnion<
        HTMLImageElement,
        ErrorEvent
    > = (e) => {
        e.currentTarget.src = faviconFallbackUrl();
    };

    return (
        <div
            class='link-container'
            ref={sortable.ref}
            style={{
                transform: `translate3d(${sortable.transform.x}px, ${sortable.transform.y}px, 0)`,
                transition: sortable.isActiveDraggable
                    ? 'none'
                    : 'transform 0.2s ease',
                'z-index': sortable.isActiveDraggable ? 1 : 0,
                opacity: sortable.isActiveDraggable ? 0.5 : 1,
                border: sortable.isActiveDraggable
                    ? 'var(--size-border-medium) dashed var(--color-button-primary)'
                    : 'var(--size-border-medium) dashed transparent',
                'pointer-events': sortable.isActiveDraggable ? 'none' : 'auto',
            }}
            title={props.link.description}
        >
            <div class='flex-row'>
                <Show when={data.editMode()}>
                    <span class='drag-handler' {...sortable.dragActivators}>
                        ⠿
                    </span>
                </Show>
                <a class='link-icon-name' href={props.link.url}>
                    <img
                        alt='Favicon'
                        onError={handleImgError}
                        src={faviconUrl()}
                    />
                    <p>{props.link.name}</p>
                </a>
            </div>

            <Show when={data.editMode()}>
                <div class='flex-row'>
                    <EditLinkButton
                        linkId={props.link.id}
                        sectionId={props.sectionId}
                    />
                    <IconTrash onClick={handleRemoveLink} />
                </div>
            </Show>
        </div>
    );
};
