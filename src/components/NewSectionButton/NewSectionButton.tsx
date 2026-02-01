import { IconAddPlus, Modal } from '@components';
import type { Tsection } from '@consts';
import { useData } from '@store';
import { cleanupString, toTitleCase } from '@utils';
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

        const newSection: Tsection = {
            id: `Section-${nanoid()}`,
            name: toTitleCase(cleanupString(newSectionName())),
            links: [],
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
                <div class='input-clear-button'>
                    <input
                        class={nameInputError() ? 'input-error' : ''}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        placeholder='Name'
                        ref={inputRef}
                        type='text'
                        value={newSectionName()}
                    />
                    <button onClick={() => setNewSectionName('')} type='button'>
                        Clear
                    </button>
                </div>
            </Modal>
        </>
    );
};
