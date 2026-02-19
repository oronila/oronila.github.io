import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            marquee: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
                behavior?: string;
                direction?: string;
                scrollamount?: number | string;
                scrolldelay?: number | string;
                loop?: number | string;
            };
        }
    }
}
