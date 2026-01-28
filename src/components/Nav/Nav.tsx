import { createSignal, onMount, onCleanup, createMemo } from 'solid-js';
import { useData } from '@store';
import { Modal, DelayedTextButton, NewSectionButton } from '@components';
import { writeClipboard } from '@solid-primitives/clipboard';

import styles from './Nav.module.css';

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
        <div class={styles.navContainer}>
            <p>{formattedDate()}</p>
            <div class={styles.navActions}>
                <NewSectionButton />
                <button class='button-secondary' onClick={toggleEditMode}>
                    {data.editMode() ? 'Done' : 'Edit mode'}
                </button>
                <button onClick={() => setShowExportModal(true)}>Export</button>
                <Modal
                    show={showExportModal()}
                    close={() => setShowExportModal(false)}
                    actionButton={
                        <DelayedTextButton
                            text='Copy'
                            altText='Copied!'
                            class='button-primary'
                            onClick={handleCopyJsonData}
                        />
                    }
                >
                    <textarea
                        style={{
                            width: '800px',
                            height: '600px',
                            resize: 'none',
                        }}
                        readOnly={true}
                        onClick={(e) => e.currentTarget.select()}
                    >
                        {formattedJsonData()}
                    </textarea>
                </Modal>
            </div>
        </div>
    );
};
