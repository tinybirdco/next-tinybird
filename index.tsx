import React, { ReactNode } from 'react'
import Head from 'next/head'

const tinybirdDomain = 'https://api.tinybird.co'
const tinybirdTrackerURL = 'https://cdn.tinybird.co/static/js/t.js'

export default function TinybirdProvider(props: {
  domain?: string
  dataSource: string
  token: string
  trackerURL?: string
  children: ReactNode | ReactNode[]
}) {
  return (
    <>
      <Head>
        <script async data-token={props.token} data-source={props.dataSource} data-domain={props.domain || tinybirdDomain} src={props.trackerURL || tinybirdTrackerURL}></script>
      </Head>
      {props.children}
    </>
  )
}


type Props = Record<string, unknown> | never
type EventOptions<P extends Props> = {
  props: P
  callback?: VoidFunction
}
type EventOptionsTuple<P extends Props> = P extends never
  ? [Omit<EventOptions<P>, 'props'>?]
  : [EventOptions<P>]
type Events = { [K: string]: Props }

export function useTinybird<E extends Events = any>() {
  return function <N extends keyof E>(
    eventName: N,
    ...rest: EventOptionsTuple<E[N]>
  ) {
    return (window as any).tinybird?.(eventName, rest[0])
  }
}