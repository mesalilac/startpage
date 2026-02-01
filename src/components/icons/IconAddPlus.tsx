import type { JSX } from 'solid-js';

export const IconAddPlus = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden='true'
            class='icon icon-add-plus'
            fill='none'
            height='1em'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1.2'
            viewBox='0 0 9 9'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path d='M0.5 4.5H4.5M4.5 4.5H8.5M4.5 4.5V8.5M4.5 4.5V0.5' />
        </svg>
    );
};
