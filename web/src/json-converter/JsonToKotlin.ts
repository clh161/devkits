import { CASE_TYPES } from '../page/CASE_TYPES';

const TAB = '    ';

type KotlinClass = string;

export function getKotlinClass(
  json: object | Array<object>,
  className: string
): KotlinClass[] {
  const codeClassStart = `data class ${className}(`;
  const fields = [];
  const nestedClasses: KotlinClass[] = [];

  if (typeof json === 'object') {
    const keys = Object.keys(json);
    for (const key of keys) {
      const codeField = `${TAB}val ${key}`;
      const value = json[key];
      if (typeof value === 'object') {
        const valueClassName = CASE_TYPES.find(
          (type) => type.key === 'camel_case'
        )?.getTextFromNormalText(key);
        const valueClassNameCapital =
          valueClassName[0].toUpperCase() + valueClassName.slice(1);
        fields.push(`${codeField}: ${valueClassNameCapital}`);

        const nestedClass = getKotlinClass(value, valueClassNameCapital);

        nestedClasses.push(...nestedClass);
      } else {
        fields.push(`${codeField}: String`);
      }
    }
  }

  const classClassEnd = `)`;
  const classAll = [
    [codeClassStart, ...fields, classClassEnd].join('\n'),
    ...nestedClasses,
  ];

  return classAll;
}
