import { useData } from '@store';
import { createSignal, createEffect } from 'solid-js';
import { nanoid } from 'nanoid';

import { Modal, IconEdit } from '@components';
import { T_Section, T_Link } from '@consts';
import styles from './EditSectionButton.module.css';

export const EditSectionButton = (props: { sectionID: string }) => {
    const data = useData();

    let inputRef: HTMLInputElement | undefined;

    const [showModal, setShowModal] = createSignal(false);
    const [SectionName, setSectionName] = createSignal('');
    const [nameInputError, setNameInputError] = createSignal(false);

    const handleEditSection = () => {
        if (!SectionName()) {
            setNameInputError(true);
            return;
        }

        data.setStore(
            'sections',
            (x) => x.id === props.sectionID,
            'name',
            SectionName().trim(),
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
                setSectionName(section.name);
            }
        } else {
            setSectionName('');
            setNameInputError(false);
        }
    });

    return (
        <>
            <IconEdit onClick={() => setShowModal(true)} />

            <Modal
                show={showModal()}
                close={() => setShowModal(false)}
                actionButton={
                    <button class='button-primary' onClick={handleEditSection}>
                        Save
                    </button>
                }
            >
                <p>Edit section</p>
                <input
                    type='text'
                    value={SectionName()}
                    placeholder='Name'
                    class={nameInputError() ? 'input-error' : ''}
                    style={{
                        width: '300px',
                    }}
                    onChange={(e) => setSectionName(e.target.value)}
                    ref={inputRef}
                />
            </Modal>
        </>
    );
};
