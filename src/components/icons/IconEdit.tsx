import type { JSX } from 'solid-js';

export const IconEdit = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
    return (
        <svg
            viewBox='0 0 9 9'
            fill='none'
            width='1em'
            height='1em'
            xmlns='http://www.w3.org/2000/svg'
            stroke='currentColor'
            stroke-width='1.2'
            stroke-linecap='round'
            stroke-linejoin='round'
            aria-hidden='true'
            class='icon icon-edit'
            {...props}
        >
            <path d='M4.60629 2.34065L0.5 6.44688V8.5L2.55315 8.49999L6.65943 4.39376M4.60629 2.34065L6.07872 0.868227L6.0796 0.867354C6.28229 0.664668 6.38382 0.563146 6.50085 0.525122C6.60394 0.491626 6.71499 0.491626 6.81808 0.525122C6.93503 0.563119 7.03644 0.664526 7.23884 0.866924L8.13185 1.75993C8.33512 1.96319 8.4368 2.06487 8.47488 2.18207C8.50838 2.28516 8.50837 2.3962 8.47487 2.49929C8.43682 2.6164 8.33529 2.71793 8.13231 2.92091L8.13186 2.92134L6.65943 4.39376M4.60629 2.34065L6.65943 4.39376' />
        </svg>
    );
};
