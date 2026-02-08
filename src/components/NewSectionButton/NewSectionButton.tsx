import { IconAddPlus, Modal } from '@components';
import type { Tlink, Tsection } from '@consts';
import { useData } from '@store';
import { toTitleCase } from '@utils';
import { nanoid } from 'nanoid';
import { createEffect, createSignal } from 'solid-js';
import './NewSectionButton.css';

export const NewSectionButton = () => {
    const data = useData();

    let inputRef: HTMLInputElement | undefined;

    const [showModal, setShowModal] = createSignal(false);
    const [newSectionName, setNewSectionName] = createSignal('');
    const [nameInputError, setNameInputError] = createSignal(false);

    const handleCreateNewSection = () => {
        if (!newSectionName()) {
            setNameInputError(true);
            return;
        }

        const newLink: Tlink = {
            id: `Link-${nanoid()}`,
            name: 'Example',
            url: 'https://example.com',
            description: '',
        };

        const newSection: Tsection = {
            id: `Section-${nanoid()}`,
            name: toTitleCase(newSectionName()),
            links: [newLink],
        };

        data.setStore({
            ...data.store,
            sections: [...data.store.sections, newSection],
        });

        setShowModal(false);
    };

    createEffect(() => {
        if (showModal()) {
            inputRef?.focus();
        } else {
            setNewSectionName('');
            setNameInputError(false);
        }
    });

    return (
        <>
            <button
                class='button-primary'
                onClick={() => setShowModal(true)}
                type='button'
            >
                <IconAddPlus class='icon-add-section' /> New section
            </button>

            <Modal
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleCreateNewSection}
                        type='button'
                    >
                        Create
                    </button>
                }
                close={() => setShowModal(false)}
                show={showModal()}
            >
                <p>Create new section</p>
                <form
                    class='flex-row'
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateNewSection();
                    }}
                >
                    <input
                        class={nameInputError() ? 'input-error' : ''}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        placeholder='Name'
                        ref={inputRef}
                        type='text'
                        value={newSectionName()}
                    />
                    <button
                        onClick={() => setNewSectionName('')}
                        tabIndex={-1}
                        type='button'
                    >
                        Clear
                    </button>
                </form>
            </Modal>
        </>
    );
};
