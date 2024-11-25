import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('Components', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/components', import.meta.url)),
  })

  it('should render correctly', async () => {
    const page = await createPage('/')

    expect(await page.getByTestId('can-visible').isVisible()).toBeTruthy()
    expect(await page.getByTestId('can-invisible').isVisible()).toBeFalsy()
    expect(await page.getByTestId('can-multiple-visible').isVisible()).toBeTruthy()
    expect(await page.getByTestId('can-multiple-invisible').isVisible()).toBeFalsy()

    expect(await page.getByTestId('as-can-visible').isVisible()).toBeTruthy()

    expect(await page.getByTestId('cannot-invisible').isVisible()).toBeFalsy()
    expect(await page.getByTestId('cannot-visible').isVisible()).toBeTruthy()
    expect(await page.getByTestId('cannot-multiple-invisible').isVisible()).toBeFalsy()
    expect(await page.getByTestId('cannot-multiple-visible').isVisible()).toBeTruthy()

    expect(await page.getByTestId('bouncer-can-visible').isVisible()).toBeTruthy()
    expect(await page.getByTestId('bouncer-cannot-invisible').isVisible()).toBeFalsy()

    expect(await page.getByTestId('bouncer-can-invisible').isVisible()).toBeFalsy()
    expect(await page.getByTestId('bouncer-cannot-visible').isVisible()).toBeTruthy()

    expect(await page.getByTestId('bouncer-can-multiple-visible').isVisible()).toBeTruthy()
    expect(await page.getByTestId('bouncer-cannot-multiple-invisible').isVisible()).toBeFalsy()

    await page.close()
  })
})
