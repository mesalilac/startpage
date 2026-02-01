import { IconAddPlus, Modal } from '@components';
import type { Tlink } from '@consts';
import { useData } from '@store';
import { linkNameFromUrl } from '@utils';
import { nanoid } from 'nanoid';
import { createEffect, createSignal } from 'solid-js';
import './NewLinkButton.css';

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

export const NewLinkButton = (props: { sectionId: string }) => {
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

        const newLink: Tlink = {
            id: `Link-${nanoid()}`,
            name: newLinkName(),
            url: cleanupUrl(newLinkUrl()),
            description: newLinkDescription().trim(),
        };

        if (!newLink.name) {
            newLink.name = linkNameFromUrl(newLink.url);
        }

        data.setStore(
            'sections',
            (section) => section.id === props.sectionId,
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
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleCreateNewLink}
                        type='button'
                    >
                        Create
                    </button>
                }
                close={() => setShowModal(false)}
                show={showModal()}
            >
                <p>Create new link</p>
                <div class='input-clear-button'>
                    <input
                        class='new-link-input'
                        onChange={(e) => setNewLinkName(e.target.value)}
                        placeholder='Name (optional)'
                        type='text'
                        value={newLinkName()}
                    />
                    <button onClick={() => setNewLinkName('')} type='button'>
                        Clear
                    </button>
                </div>
                <div class='input-clear-button'>
                    <input
                        class={
                            (urlInputError() ? 'input-error' : '') +
                            ' ' +
                            'new-link-input'
                        }
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder='Url'
                        ref={inputRef}
                        type='text'
                        value={newLinkUrl()}
                    />
                    <button onClick={() => setNewLinkUrl('')} type='button'>
                        Clear
                    </button>
                </div>
                <div class='input-clear-button'>
                    <input
                        class='new-link-input'
                        onChange={(e) => setNewLinkDescription(e.target.value)}
                        placeholder='Description (optional)'
                        type='text'
                        value={newLinkDescription()}
                    />
                    <button
                        onClick={() => setNewLinkDescription('')}
                        type='button'
                    >
                        Clear
                    </button>
                </div>
            </Modal>
        </>
    );
};
