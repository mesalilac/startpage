import { useData } from '@store';
import { createSignal, createEffect } from 'solid-js';
import { nanoid } from 'nanoid';

import { IconEdit, Modal } from '@components';
import { T_Section, T_Link } from '@consts';

import styles from './EditLinkButton.module.css';

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const EditLinkButton = (props: {
    sectionID: string;
    linkID: string;
}) => {
    const data = useData();

    let inputRef: HTMLInputElement | undefined;

    const [showModal, setShowModal] = createSignal(false);
    const [newLinkName, setNewLinkName] = createSignal('');
    const [newLinkUrl, setNewLinkUrl] = createSignal('');
    const [newLinkDescription, setNewLinkDescription] = createSignal('');
    const [urlInputError, setUrlInputError] = createSignal(false);

    const handleCreateNewLink = () => {
        if (!newLinkUrl() || !isValidUrl(newLinkUrl())) {
            setUrlInputError(true);
            return;
        }

        const newLink: T_Link = {
            id: nanoid(),
            name: newLinkName().trim(),
            url: newLinkUrl().trim(),
            description: newLinkDescription().trim(),
        };

        if (!newLink.name) {
            newLink.name = new URL(newLink.url).hostname.trim();
        }

        data.setStore(
            'sections',
            (section) => section.id === props.sectionID,
            'links',
            (link) => link.id === props.linkID,
            newLink,
        );

        setShowModal(false);
    };

    createEffect(() => {
        if (showModal()) {
            inputRef?.focus();
            const section = data.store.sections.find(
                (x) => x.id === props.sectionID,
            );

            if (section) {
                const link = section.links.find((x) => x.id === props.linkID);

                if (link) {
                    setNewLinkName(link.name);
                    setNewLinkUrl(link.url);
                    setNewLinkDescription(link.description);
                }
            }
        } else {
            setNewLinkName('');
            setNewLinkUrl('');
            setNewLinkDescription('');
            setUrlInputError(false);
        }
    });

    return (
        <>
            <IconEdit onClick={() => setShowModal(true)} />

            <Modal
                show={showModal()}
                close={() => setShowModal(false)}
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleCreateNewLink}
                    >
                        Create
                    </button>
                }
            >
                <p>Create new link</p>
                <input
                    type='text'
                    value={newLinkName()}
                    placeholder='Name (optional)'
                    class={styles.NewLinkInput}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    ref={inputRef}
                />
                <input
                    type='text'
                    value={newLinkUrl()}
                    placeholder='Url'
                    class={
                        (urlInputError() ? 'input-error' : '') +
                        ' ' +
                        styles.NewLinkInput
                    }
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                />
                <input
                    type='text'
                    value={newLinkDescription()}
                    class={styles.NewLinkInput}
                    placeholder='Description (optional)'
                    onChange={(e) => setNewLinkDescription(e.target.value)}
                />
            </Modal>
        </>
    );
};
