import type { JSX } from 'solid-js';

export const IconAddPlus = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
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
            class='icon icon-add-plus'
            {...props}
        >
            <path d='M0.5 4.5H4.5M4.5 4.5H8.5M4.5 4.5V8.5M4.5 4.5V0.5' />
        </svg>
    );
};
