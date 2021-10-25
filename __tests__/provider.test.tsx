import { cleanup, render } from '@testing-library/react'
import React from 'react'

import TinybirdProvider from '../index'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

describe('Next-Tinybird provider', () => {
  afterEach(cleanup)

  it('includes the tracker script with the proper data attributes', async () => {
    const { container, findByText } = render(<TinybirdProvider apiUrl="https://tinybird.co" dataSource="events" token="abc123" trackerURL="https://tinybird.co/t.js">The children</TinybirdProvider>)

    const scripts = container.getElementsByTagName('script')

    expect(scripts.length).toBeGreaterThan(0)
    const script = scripts[0]
    expect(script.dataset['token']).toEqual('abc123')
    expect(script.dataset['api']).toEqual('https://tinybird.co')
    expect(script.dataset['source']).toEqual('events')
    expect(await findByText('The children')).toBeVisible()
  })
})
