import { IconEdit, Modal } from '@components';
import type { Tlink } from '@consts';
import { useData } from '@store';
import { linkNameFromUrl } from '@utils';
import { nanoid } from 'nanoid';
import { createEffect, createSignal } from 'solid-js';

import './EditLinkButton.css';

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const EditLinkButton = (props: {
    sectionId: string;
    linkId: string;
}) => {
    const data = useData();

    let inputRef: HTMLInputElement | undefined;

    const [showModal, setShowModal] = createSignal(false);
    const [newLinkName, setNewLinkName] = createSignal('');
    const [newLinkUrl, setNewLinkUrl] = createSignal('');
    const [newLinkDescription, setNewLinkDescription] = createSignal('');
    const [urlInputError, setUrlInputError] = createSignal(false);

    const handleEditLink = () => {
        if (!newLinkUrl() || !isValidUrl(newLinkUrl())) {
            setUrlInputError(true);
            return;
        }

        const newLink: Tlink = {
            id: nanoid(),
            name: newLinkName().trim(),
            url: newLinkUrl().trim(),
            description: newLinkDescription().trim(),
        };

        if (!newLink.name) {
            newLink.name = linkNameFromUrl(newLink.url);
        }

        data.setStore(
            'sections',
            (section) => section.id === props.sectionId,
            'links',
            (link) => link.id === props.linkId,
            newLink,
        );

        setShowModal(false);
    };

    createEffect(() => {
        if (showModal()) {
            inputRef?.focus();
            const section = data.store.sections.find(
                (x) => x.id === props.sectionId,
            );

            if (section) {
                const link = section.links.find((x) => x.id === props.linkId);

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
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleEditLink}
                        type='button'
                    >
                        Save
                    </button>
                }
                close={() => setShowModal(false)}
                show={showModal()}
            >
                <p>Edit link</p>
                <div class='input-clear-button'>
                    <input
                        class='new-link-input'
                        onChange={(e) => setNewLinkName(e.target.value)}
                        placeholder='Name (optional)'
                        ref={inputRef}
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
