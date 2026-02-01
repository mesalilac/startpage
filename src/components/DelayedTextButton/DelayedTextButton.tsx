import { createSignal } from 'solid-js';
// import './DelayedTextButton.css';

export const DelayedTextButton = (props: {
    text: string;
    altText: string;
    onClick: () => void;
    timeOut?: number;
    class?: string;
    disabled?: boolean;
}) => {
    const [buttonText, setButtonText] = createSignal(props.text);

    const handleButtonClick = () => {
        props.onClick();
        setButtonText(props.altText);
        setTimeout(() => setButtonText(props.text), props.timeOut || 2000);
    };

    return (
        <button class={props.class} onClick={handleButtonClick} type='button'>
            {buttonText()}
        </button>
    );
};
