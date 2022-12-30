import { CASE_TYPES } from '../page/CASE_TYPES';

const TAB = '    ';

type KotlinClass = string;

export function getKotlinClass(
  json: object | Array<object>,
  className: string,
  tabCount = 1
): KotlinClass[] {
  const codeClassStart = `data class ${className}(`;
  const codeTab = Array.from({ length: tabCount + 1 }).join(TAB);
  const fields = [];
  const nestedClasses = [];

  if (typeof json === 'object') {
    const keys = Object.keys(json);
    for (const key of keys) {
      const codeField = `${codeTab}val ${key}`;
      const value = json[key];
      if (typeof value === 'object') {
        const valueClassName = CASE_TYPES.find(
          (type) => type.key === 'camel_case'
        )?.getTextFromNormalText(key);
        const valueClassNameCapital =
          valueClassName[0].toUpperCase() + valueClassName.slice(1);
        fields.push(`${codeField}: ${valueClassNameCapital}`);
        nestedClasses.push(
          getKotlinClass(value, valueClassNameCapital, tabCount + 1)
        );
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

function getFields(json: unknown, tabCount = 1): string {
  const codeTab = Array.from({ length: tabCount + 1 }).join(TAB);
  if (typeof json === 'object') {
    const keys = Object.keys(json);
    return keys
      .map((key) => {
        const codeField = `${codeTab}val ${key}`;
        const value = json[key];
        if (typeof value === 'object') {
          return `${codeField} ${getKotlinClass(value, key)}`;
        }
        return `${codeTab}val ${key} string`;
      })
      .join('\n');
  }
  return '';
}
