import { useData } from '@store';

import { createMemo, Show, JSX } from 'solid-js';
import { T_Link } from '@consts';
import { EditLinkButton, IconTrash } from '@components';
import { generate_favicon_url } from '@utils';
import styles from './Link.module.css';

export const Link = (props: { sectionID: string; link: T_Link }) => {
    const data = useData();

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
        <div class={styles.LinkContainer} title={props.link.description}>
            <a class={styles.LinkIconName} href={props.link.url}>
                <img
                    src={faviconUrl()}
                    onError={(e) =>
                        (e.currentTarget.src = faviconFallbackUrl())
                    }
                />
                <p>{props.link.name}</p>
            </a>

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
