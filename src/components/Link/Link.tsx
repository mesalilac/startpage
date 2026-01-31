import { useData } from '@store';

import { createMemo, Show, JSX } from 'solid-js';
import { T_DraggableData, T_Link } from '@consts';
import { EditLinkButton, IconTrash } from '@components';
import { generate_favicon_url } from '@utils';
import styles from './Link.module.css';
import { createSortable } from '@thisbeyond/solid-dnd';

export const LinkOverlay = (props: { sectionID: string; link: T_Link }) => {
    const faviconUrl = createMemo(() => {
        const url = new URL(props.link.url);
        return `./favicon/${url.hostname}.png`;
    });

    const faviconFallbackUrl = createMemo(() => {
        return generate_favicon_url(props.link.url, 16);
    });

    return (
        <div
            class={styles.LinkContainer}
            title={props.link.description}
            style={{
                'background-color':
                    'hsl(from var(--color-surface-base) h s l / 80%)',
                'backdrop-filter': 'blur(2px)',
                'pointer-events': 'none',
            }}
        >
            <div class={styles.LinkActions}>
                <span class='drag-handler'>⠿</span>
                <a class={styles.LinkIconName} href={props.link.url}>
                    <img
                        src={faviconUrl()}
                        onError={(e) =>
                            (e.currentTarget.src = faviconFallbackUrl())
                        }
                    />
                    <p>{props.link.name}</p>
                </a>
            </div>
        </div>
    );
};

export const Link = (props: { sectionID: string; link: T_Link }) => {
    const data = useData();

    const sortable = createSortable(props.link.id, {
        type: 'link',
        data: props.link,
        parentSectionId: props.sectionID,
    } as T_DraggableData);

    const handleRemoveLink = () => {
        data.setStore(
            'sections',
            (section) => section.id === props.sectionID,
            'links',
            (links) => links.filter((link) => link.id !== props.link.id),
        );
    };

    const faviconUrl = createMemo(() => {
        const url = new URL(props.link.url);
        return `./favicon/${url.hostname}.png`;
    });

    const faviconFallbackUrl = createMemo(() => {
        return generate_favicon_url(props.link.url, 16);
    });

    return (
        <div
            ref={sortable.ref}
            class={styles.LinkContainer}
            title={props.link.description}
            style={{
                transform: `translate3d(${sortable.transform.x}px, ${sortable.transform.y}px, 0)`,
                transition: sortable.isActiveDraggable
                    ? 'none'
                    : 'transform 0.2s ease',
                'z-index': sortable.isActiveDraggable ? 1 : 0,
                opacity: sortable.isActiveDraggable ? 0.5 : 1,
                outline: sortable.isActiveDraggable
                    ? 'var(--size-border-medium) dashed var(--color-button-primary)'
                    : '',
                'pointer-events': sortable.isActiveDraggable ? 'none' : 'auto',
            }}
        >
            <div class={styles.LinkActions}>
                <Show when={data.editMode()}>
                    <span class='drag-handler' {...sortable.dragActivators}>
                        ⠿
                    </span>
                </Show>
                <a class={styles.LinkIconName} href={props.link.url}>
                    <img
                        src={faviconUrl()}
                        onError={(e) =>
                            (e.currentTarget.src = faviconFallbackUrl())
                        }
                    />
                    <p>{props.link.name}</p>
                </a>
            </div>

            <Show when={data.editMode()}>
                <div class={styles.LinkActions}>
                    <EditLinkButton
                        sectionID={props.sectionID}
                        linkID={props.link.id}
                    />
                    <IconTrash onClick={handleRemoveLink} />
                </div>
            </Show>
        </div>
    );
};
