// import { useData } from '@store';
import type { JSX } from 'solid-js';
import { onCleanup, onMount, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import './Modal.css';

export const Modal = (props: {
    show: boolean;
    close: () => void;
    actionButton?: JSX.Element;
    children: JSX.Element;
}) => {
    // const data = useData();

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.close();
        }
    };

    onMount(() => {
        document.addEventListener('keydown', handleKeydown);
    });

    onCleanup(() => {
        document.removeEventListener('keydown', handleKeydown);
    });

    return (
        <Show when={props.show}>
            <Portal>
                <div class='modal-container' onClick={props.close} role='none'>
                    <div
                        class='modal-body'
                        onClick={(e) => e.stopPropagation()}
                        role='none'
                    >
                        {props.children}
                        <div class='modal-actions'>
                            {props.actionButton}
                            <button onClick={props.close} type='button'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Portal>
        </Show>
    );
};
