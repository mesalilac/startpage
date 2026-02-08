import { IconEdit, Modal } from '@components';
import { useData } from '@store';
import { toTitleCase } from '@utils';
import { createEffect, createSignal } from 'solid-js';
// import './EditSectionButton.css';

export const EditSectionButton = (props: { sectionId: string }) => {
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
            (x) => x.id === props.sectionId,
            'name',
            toTitleCase(SectionName()),
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
                setSectionName(section.name);
            }
        } else {
            setSectionName('');
            setNameInputError(false);
        }
    });

    const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        handleEditSection();
    };

    return (
        <>
            <IconEdit onClick={() => setShowModal(true)} />

            <Modal
                actionButton={
                    <button
                        class='button-primary'
                        onClick={handleEditSection}
                        type='button'
                    >
                        Save
                    </button>
                }
                close={() => setShowModal(false)}
                show={showModal()}
            >
                <p>Edit section</p>
                <div class='flex-row'>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            class={nameInputError() ? 'input-error' : ''}
                            onChange={(e) => setSectionName(e.target.value)}
                            placeholder='Name'
                            ref={inputRef}
                            style={{
                                width: '300px',
                            }}
                            type='text'
                            value={SectionName()}
                        />
                    </form>
                    <button
                        onClick={() => setSectionName('')}
                        tabIndex={-1}
                        type='button'
                    >
                        Clear
                    </button>
                </div>
            </Modal>
        </>
    );
};
