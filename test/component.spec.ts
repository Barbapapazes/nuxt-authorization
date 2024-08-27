import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('Components', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/components', import.meta.url)),
  })

  it('should render correctly', async () => {
    const page = await createPage('/')

    expect(await page.getByTestId('view-can').isVisible()).toBeTruthy()
    expect(await page.getByTestId('view-not-can').isVisible()).toBeFalsy()
    expect(await page.getByTestId('view-cannot').isVisible()).toBeFalsy()
    expect(await page.getByTestId('view-not-cannot').isVisible()).toBeTruthy()

    await page.close()
  })
})
