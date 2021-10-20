import React, { ReactNode } from 'react'
import Head from 'next/head'

const tinybirdDomain = 'https://api.tinybird.co'
const tinybirdTrackerURL = 'https://cdn.tinybird.co/static/js/t.js'

export default function TinybirdProvider(props: {
  api?: string
  dataSource?: string
  token?: string
  trackerURL?: string
  children: ReactNode | ReactNode[]
}) {
  return (
    <>
      <Head>
        <script 
          async
          data-token={props.token}
          data-source={props.dataSource}
          data-api={props.api || tinybirdDomain}
          src={props.trackerURL || tinybirdTrackerURL}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.tinybird = window.tinybird || function() { (window.tinybird.q = window.tinybird.q || []).push(arguments) }`,
          }}
        />
      </Head>
      {props.children}
    </>
  )
}

type Props = Record<string, unknown> | never
type Events = { [K: string]: Props }

export function useTinybird<E extends Events = any>() {
  return function <N extends keyof E>(
    eventName: N,
    props?: Props
  ) {
    return (window as any).tinybird?.(eventName, props)
  }
}