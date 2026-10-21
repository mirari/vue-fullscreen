// @vitest-environment node
import { expect, it } from 'vitest'
import { useFullscreen } from '../src/index'

it('can create a composable during SSR without accessing the DOM', async () => {
  const controls = useFullscreen()
  expect(controls.isFullscreen.value).toBe(false)
  expect(controls.isSupported.value).toBe(false)
  await expect(controls.enter()).rejects.toThrow('requires a browser')
  await controls.exit()
})
