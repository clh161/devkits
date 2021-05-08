// @flow strict

const { getTexts } = require('../CaseTypeConverter');
it('Normal Text', () => {
  expect(getTexts('normal_text', 'some random text for test')).toEqual({
    camel_case: 'someRandomTextForTest',
    kebab_case: 'some-random-text-for-test',
    normal_text: 'some random text for test',
    snake_case: 'some_random_text_for_test',
    snake_upper_case: 'SOME_RANDOM_TEXT_FOR_TEST',
  });
});

it('Camel Case', () => {
  expect(getTexts('camel_case', 'DevkitsIsGood')).toEqual({
    camel_case: 'DevkitsIsGood',
    kebab_case: 'devkits-is-good',
    normal_text: 'devkits is good',
    snake_case: 'devkits_is_good',
    snake_upper_case: 'DEVKITS_IS_GOOD',
  });
});

it('Kebab Case', () => {
  expect(getTexts('kebab_case', 'one-plus-one-equals-two')).toEqual({
    camel_case: 'onePlusOneEqualsTwo',
    kebab_case: 'one-plus-one-equals-two',
    normal_text: 'one plus one equals two',
    snake_case: 'one_plus_one_equals_two',
    snake_upper_case: 'ONE_PLUS_ONE_EQUALS_TWO',
  });
});

it('Snake Case', () => {
  expect(getTexts('snake_case', 'i_go_to_school_by_bus')).toEqual({
    camel_case: 'iGoToSchoolByBus',
    kebab_case: 'i-go-to-school-by-bus',
    normal_text: 'i go to school by bus',
    snake_case: 'i_go_to_school_by_bus',
    snake_upper_case: 'I_GO_TO_SCHOOL_BY_BUS',
  });
});

it('Snake Upper Case', () => {
  expect(getTexts('snake_upper_case', 'TODAY_IS_FRIDAY')).toEqual({
    camel_case: 'todayIsFriday',
    kebab_case: 'today-is-friday',
    normal_text: 'today is friday',
    snake_case: 'today_is_friday',
    snake_upper_case: 'TODAY_IS_FRIDAY',
  });
});
