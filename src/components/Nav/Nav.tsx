import { DelayedTextButton, Modal, NewSectionButton } from '@components';
import { writeClipboard } from '@solid-primitives/clipboard';
import { useData } from '@store';
import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import './Nav.css';

export const Nav = () => {
    const data = useData();

    const [showExportModal, setShowExportModal] = createSignal(false);
    const [now, setNow] = createSignal(new Date());

    const toggleEditMode = () => {
        data.setEditMode(!data.editMode());
    };

    onMount(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);

        onCleanup(() => clearInterval(timer));
    });

    const formattedDate = createMemo(() => {
        return now().toLocaleDateString('en-JP', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    });

    const formattedJsonData = createMemo(() => {
        return JSON.stringify(data.store, null, 4);
    });

    const handleCopyJsonData = async () => {
        try {
            await writeClipboard(formattedJsonData());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class='nav-container'>
            <p>{formattedDate()}</p>
            <div class='nav-actions'>
                <NewSectionButton />
                <button
                    class='button-secondary'
                    onClick={toggleEditMode}
                    type='button'
                >
                    {data.editMode() ? 'Done' : 'Edit mode'}
                </button>
                <button onClick={() => setShowExportModal(true)} type='button'>
                    Export
                </button>
                <Modal
                    actionButton={
                        <DelayedTextButton
                            altText='Copied!'
                            class='button-primary'
                            onClick={handleCopyJsonData}
                            text='Copy'
                        />
                    }
                    close={() => setShowExportModal(false)}
                    show={showExportModal()}
                >
                    <textarea
                        onClick={(e) => e.currentTarget.select()}
                        readOnly={true}
                        style={{
                            width: '800px',
                            height: '600px',
                            resize: 'none',
                        }}
                    >
                        {formattedJsonData()}
                    </textarea>
                </Modal>
            </div>
        </div>
    );
};
