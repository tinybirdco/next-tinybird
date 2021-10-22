# Next-Tinybird

Next-Tinybird makes easy to send analytics events to Tinybird in a Next.js application. Internally, it's a wrapper of [Tinybird tracker](https://github.com/tinybirdco/tinybird-tracker)

Next-Tinybird helps you record events happening in your Next.js application and stores them in a Data Source within your Tinybird account. You can then explore this data in Real-time through Tinybird's SQL pipes and endpoints.

It offers a Provider to configure the Tinybird tracker script and a hook for sending the events.

## What's Tinybird?

[Tinybird](https://www.tinybird.co/) helps developers and data teams build Realtime Data Products at any scale. They are helping companies of all sizes ingest millions of rows per second and to power their analytical applications via low-latency, high-concurrency SQL based APIs that developers can build and publish in minutes.

## Getting started

### Prerequisite - Creating the Data Source

Before sending any event to Tinybird, you will need a [Data Source](https://docs.tinybird.co/main-concepts.html#data-sources) to store those events.

Please, refer to the [Prerequisite - Creating the Data Source section of the Tinybird-tracker README.](https://github.com/tinybirdco/tinybird-tracker#prerequisite---creating-the-data-source) There you will find all the steps that you need to take before sending events to Tinybird.

## Usage

After following the [prerequisite guide](https://github.com/tinybirdco/tinybird-tracker#prerequisite---creating-the-data-source), you will end up with an append token and a datasource. Let's start sending events.

### Setting environment variables

You will need two mandatory environment variables:
- NEXT_PUBLIC_TINYBIRD_TOKEN: with the token generated above, the one for appending data to the events Data Source. 
- NEXT_PUBLIC_TINYBIRD_DATASOURCE: with the name of the events Data Source

There are also two optional variables that you probably won't need to change from their default values:
- NEXT_PUBLIC_TINYBIRD_API: to select the API server to call to. Needed if you are in a different cluster from the default EU one.
- NEXT_PUBLIC_TINYBIRD_TRACKER_URL: in case you want to include a different URL for the Tinybird-track script. 

More info about env variables in Next.js at [their docs.](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)


### Adding the Provider

You need to add the Tinybird Provider to include the tracker script that will make the actual calls.

```
// _app.tsx // _app.js

import TinybirdProvider from '@tinybirdco/next-tinybird'

  return (
    <TinybirdProvider 
      dataSource={process.env.NEXT_PUBLIC_TINYBIRD_DATASOURCE}
      token={process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}
    >
      <Component {...pageProps} />
    </TinybirdProvider>
  )
```

**`TinybirdProvider` props**

| Name | Description |
|-|-|
| dataSource | Name of the Data Source to send the events to |
| token | Access token to append data to the Data Source |
| apUrl | (Optional) API URL
| trackerURL | (Optional) URL of the Tinybird-tracker script |


### useTinybird hook

Use our hook to send events to your Data Source.

```
import { useTinybird } from '@tinybirdco/next-tinybird'

export default function BuyButton() {
  const tinybird = useTinybird()

  return (
    <>
      <button onClick={() => tinybird('click',
        {
          id: 'buy-button',
          userEmail: 'johndoe@doe.com',
          section: 'shopping cart'
        })}
      />
    </>
  )
}
```

### Checking that everything works

If you go to the Tinybird UI you will see the events in the Data Source modal.

![populated datasource](https://user-images.githubusercontent.com/1078228/138273316-9dd46c52-9beb-4e37-84b8-82f9ab219f3d.png)

Now, your imagination is the limit! Read [our guides to know how to consume this data creating endpoints](https://docs.tinybird.co/api-reference/query-api.html) and integrating them in your apps, dashboards, you name it!

## Kudos

Next-Tinybird is inspired by [Next-Plausible](https://github.com/4lejandrito/next-plausible/)
