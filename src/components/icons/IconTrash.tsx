import type { JSX } from 'solid-js';

export const IconTrash = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
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
            class='icon icon-trash'
            {...props}
        >
            <path d='M1.5 1.83333V7.07778C1.5 7.5756 1.5 7.82434 1.60899 8.01449C1.70487 8.18174 1.85774 8.31799 2.0459 8.40321C2.2596 8.5 2.5395 8.5 3.09845 8.5H5.90155C6.4605 8.5 6.73999 8.5 6.9537 8.40321C7.14186 8.31799 7.29524 8.18174 7.39111 8.01449C7.5 7.82453 7.5 7.576 7.5 7.07915V1.83333M1.5 1.83333H2.5M1.5 1.83333H0.5M2.5 1.83333H6.5M2.5 1.83333C2.5 1.41916 2.5 1.21218 2.57612 1.04883C2.67761 0.831025 2.87216 0.657879 3.11719 0.567663C3.30096 0.5 3.53406 0.5 4 0.5H5C5.46594 0.5 5.69891 0.5 5.88268 0.567663C6.12771 0.657879 6.32233 0.831025 6.42383 1.04883C6.49995 1.21218 6.5 1.41916 6.5 1.83333M6.5 1.83333H7.5M7.5 1.83333H8.5' />
        </svg>
    );
};
