// @flow strict

const { getTexts } = require('../CaseTypeConverter');
test('getTexts', () => {
  expect(getTexts('normal_text', 'some random text for test')).toEqual({
    camel_case: 'someRandomTextForTest',
    kebab_case: 'some-random-text-for-test',
    normal_text: 'some random text for test',
    snake_case: 'some_random_text_for_test',
    snake_upper_case: 'SOME_RANDOM_TEXT_FOR_TEST',
  });
});
