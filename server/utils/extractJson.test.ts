import { extractJsonData } from "./extractJson";
import { describe, test, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('extractJsonData', () => {
  test('should extract JSON data from the string', () => {
    const content = 'some text [{"key": "value"}, {"key2": "value2"}] more text';
    const result = extractJsonData(content);
    expect(result).toEqual([
      { key: 'value' },
      { key2: 'value2' },
    ]);
  });

  test('should throw an error when there is no JSON data in the string', () => {
    const content = 'some text with no JSON data';
    expect(() => extractJsonData(content)).toThrowError(
      'No JSON data found in the string'
    );
  });
});

