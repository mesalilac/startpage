import { useData } from '@store';
import { createSignal, createEffect } from 'solid-js';
import { nanoid } from 'nanoid';

import { IconAddPlus, Modal } from '@components';
import { T_Section, T_Link } from '@consts';

import styles from './NewLinkButton.module.css';
import { linkNameFromUrl } from '@utils';

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const cleanupUrl = (url: string) => {
    let currentUrl = url.trim();

    while (
        currentUrl.endsWith('/') &&
        !currentUrl.endsWith('://') &&
        currentUrl !== '/'
    ) {
        currentUrl = currentUrl.slice(0, -1);
    }

    return currentUrl;
};

export const NewLinkButton = (props: { sectionID: string }) => {
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
            name: newLinkName(),
            url: cleanupUrl(newLinkUrl()),
            description: newLinkDescription().trim(),
        };

        if (!newLink.name) {
            newLink.name = linkNameFromUrl(newLink.url);
        }

        data.setStore(
            'sections',
            (section) => section.id === props.sectionID,
            'links',
            (links) => [...links, newLink],
        );

        setShowModal(false);
    };

    createEffect(() => {
        if (showModal()) {
            inputRef?.focus();
        } else {
            setNewLinkName('');
            setNewLinkUrl('');
            setNewLinkDescription('');
            setUrlInputError(false);
        }
    });

    return (
        <>
            <IconAddPlus onClick={() => setShowModal(true)} />

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
                <div class='input-clear-button'>
                    <input
                        type='text'
                        value={newLinkName()}
                        placeholder='Name (optional)'
                        class={styles.NewLinkInput}
                        onChange={(e) => setNewLinkName(e.target.value)}
                    />
                    <button onClick={() => setNewLinkName('')}>Clear</button>
                </div>
                <div class='input-clear-button'>
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
                        ref={inputRef}
                    />
                    <button onClick={() => setNewLinkUrl('')}>Clear</button>
                </div>
                <div class='input-clear-button'>
                    <input
                        type='text'
                        value={newLinkDescription()}
                        class={styles.NewLinkInput}
                        placeholder='Description (optional)'
                        onChange={(e) => setNewLinkDescription(e.target.value)}
                    />
                    <button onClick={() => setNewLinkDescription('')}>
                        Clear
                    </button>
                </div>
            </Modal>
        </>
    );
};
