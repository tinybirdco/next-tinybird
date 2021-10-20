import { ReactNode } from 'react';
export default function TinybirdProvider(props: {
    api?: string;
    dataSource?: string;
    token?: string;
    trackerURL?: string;
    children: ReactNode | ReactNode[];
}): JSX.Element;
declare type Props = Record<string, unknown> | never;
declare type Events = {
    [K: string]: Props;
};
export declare function useTinybird<E extends Events = any>(): <N extends keyof E>(eventName: N, props?: Record<string, unknown> | undefined) => any;
export {};
