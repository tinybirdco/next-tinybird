import { ReactNode } from 'react';
export default function TinybirdProvider(props: {
    api?: string;
    dataSource: string;
    token: string;
    trackerURL?: string;
    children: ReactNode | ReactNode[];
}): JSX.Element;
declare type Props = Record<string, unknown> | never;
declare type EventOptions<P extends Props> = {
    props: P;
    callback?: VoidFunction;
};
declare type EventOptionsTuple<P extends Props> = P extends never ? [Omit<EventOptions<P>, 'props'>?] : [EventOptions<P>];
declare type Events = {
    [K: string]: Props;
};
export declare function useTinybird<E extends Events = any>(): <N extends keyof E>(eventName: N, ...rest: EventOptionsTuple<E[N]>) => any;
export {};
