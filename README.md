# Next-Tinybird

Next-Tinybird makes easy to send analytics events to Tinybird in a Next.js application. Internally, it's a wrapper of [Tinybird tracker](https://github.com/tinybirdco/tinybird-tracker)

Next-Tinybird helps you record events happening in your Next.js application and stores them in a Data Source within your Tinybird account. You can then explore this data in Real-time through Tinybird's SQL pipes and endpoints.

It offers a Provider to configure the Tinybird tracker script and a hook for sending the events.

## What's Tinybird?

[Tinybird](https://www.tinybird.co/) helps developers and data teams build Realtime Data Products at any scale. They are helping companies of all sizes ingest millions of rows per second and to power their analytical applications via low-latency, high-concurrency SQL based APIs that developers can build and publish in minutes.

## Getting started

### Prerequisite - Creating the Data Source

Before sending any event to Tinybird, you will need a [Data Source](https://docs.tinybird.co/main-concepts.html#data-sources) to store those events.

The best way to create a datasource to use along with Next-Tinybird is via API. The datasource has to contain a certain set of default columns for the data we send by default and you can add your columns for the custom data you want to track.

The default properties we send are:

| Property      | Type     | Description                                           |
|---------------|----------|-------------------------------------------------------|
| event         | String   | The name of the event                                 |
| timestamp     | DateTime | Timestamp of the event                                |
| session_start | DateTime | Timestamp when the tracker was instantiated on a page |
| uuid          | String   | An automatically generated uuid to track a given user through different pages |

**Using the API to create the Data Source**

To make the API call, you will need to provide three things:
1. Your Auth Token that allows creating Data Sources.
2. A name for the Data Source.
3. The schema of the Data Source (its columns and types)

**Auth token**

The easiest way to get your authentication token to create a Data Source is to copy-paste it from the code snippets we show in our UI.

1. Sign in your Tinybird account.

2. Click on `Add new Data Source` (or press P)

    ![image](https://user-images.githubusercontent.com/1078228/138217402-0e2b1a37-87ff-4c72-addf-021eec6d75d0.png)

3. Copy-paste your token from the code snippet at the bottom

    ![token](https://user-images.githubusercontent.com/1078228/138218035-bc5ca151-e99d-432b-b719-79207ca1cda2.png)

Warning! The token shown in the snippets, the one you copied following this guide, is you admin token. Don't share it or publish in your application. We'll later create a secure token exclusively for adding data to a Data Source. You can manage your tokens via API or using the Auth Tokens section in the UI. More detailed info at [Auth Tokens management](https://docs.tinybird.co/api-reference/token-api.html)

**Data Source schema**

The schema is the set of columns, their types and their jsonpaths that you want to store in a Data Source. In this case, the schema will contain the set of default properties plus the extra data you want to send with every event.

For instance, say you want to send an `id` of the element that triggered the event, the user email and the section of your Next.js where the event happened.

```
tinybird('click', { id: 'buy-button', userEmail: 'johndoe@doe.com', section: 'shopping cart' })
```

The schema needed for the default properties plus that info is
```
schema:event String `json:$.event`, timestamp DateTime `json:$.timestamp`, session_start String `json:$.session_start`, uuid String `json:$.uuid`, id String `json:$.id`, userEmail String `json:$.userEmail`, section String `json:$.section`
``` 

As you can see, the template is `{name of column} {type} {jsonpath}`

We encourage you to send a homogeneus object each time. That is, the same properties per event. If that's not possible, we advise you to mark the properties that are sent only sometimes as `Nullable`.

In our example, imagine that `section` is a value that you don't have every time. In that case, its schema would be
```
section Nullable(String) `json:$.section`
```

**Calling the API**

Putting it all together! You'll have to call the API like this, using your token, your desired Data Source name and your schema.

```
curl \
  -H 'Authorization: Bearer {YOUR_TOKEN}' \
  -X POST \
  -G \
  -d 'mode=create' \
  -d 'format=ndjson' \
  -d 'name={YOUR_DATASOURCE_NAME}' \
  --data-urlencode 'schema=event String `json:$.event`, timestamp DateTime `json:$.timestamp`, session_start String `json:$.session_start`, uuid String `json:$.uuid`, id String `json:$.id`, userEmail String `json:$.userEmail`, section Nullable(String) `json:$.section`' \
  https://api.tinybird.co/v0/datasources
```

There you go! Now you have a Data Source where Next-Tinybird can start sending data.

![datasource](https://user-images.githubusercontent.com/1078228/138261590-25479310-b259-439c-bf42-2c3ebe33fc05.png)

**Getting an access token to append data**

In order to make calls to append data to a Data Source, you will need a token. The one we used before is not elligible since it's you admin one and you don't want it to be public in the call you make from your Next.js application.

Let's create one only for appending to your recently created Data Source.

1. Go to `Manage Auth Tokens` in the sidebar

    ![auth tokens sidebar](https://user-images.githubusercontent.com/1078228/138264926-4611add5-1d5c-4ea9-95be-32b13446938b.png)

2. Click on `Create New`

3. Click on `Add Data Source scope`

4. Select the Data Source you created previously.

5. Select only the `Append` scope and click on `Add`

6. Give a descriptive name of the token, like `Events token`. You can do it modifying the generated name in the top of the form, that'll be something like `New Token {random number}`.

7. Save changes

## Usage

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

import TinybirdProvider from 'next-tinybird'

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
import { useTinybird } from 'next-tinybird'

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
