import { expect, test } from '@jest/globals'
import { hello } from '../src'

test('say hi', () => {
  expect(hello('mitico')).toBe('Hello mitico!')
})
