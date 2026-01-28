import { useData } from '@store';
import { createSignal, createEffect } from 'solid-js';
import { nanoid } from 'nanoid';

import { Modal } from '@components';
import { T_Section, T_Link } from '@consts';
import styles from './NewSectionButton.module.css';

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

        const newSection: T_Section = {
            id: nanoid(),
            name: newSectionName().trim(),
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
            <button class='button-primary' onClick={() => setShowModal(true)}>
                New section
            </button>

            <Modal
                show={showModal()}
                close={() => setShowModal(false)}
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleCreateNewSection}
                    >
                        Create
                    </button>
                }
            >
                <p>Create new section</p>
                <input
                    type='text'
                    value={newSectionName()}
                    placeholder='Name'
                    class={nameInputError() ? 'input-error' : ''}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    ref={inputRef}
                />
            </Modal>
        </>
    );
};
