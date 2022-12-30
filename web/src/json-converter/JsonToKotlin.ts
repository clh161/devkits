import { CASE_TYPES } from '../page/CASE_TYPES';

const TAB = '    ';

type KotlinClass = string;

type ClassStructure = {
  name: string;
  fields: FieldStructure[];
};

type FieldStructure =
  | {
      name: string;
      type: 'string';
    }
  | {
      name: string;
      type: 'class';
      valueName: string;
    };

function getClassStructures(
  json: object | Array<object>,
  className: string
): ClassStructure[] {
  const fields: FieldStructure[] = [];
  const nestedClasses: ClassStructure[] = [];

  if (typeof json === 'object') {
    const keys = Object.keys(json);
    for (const key of keys) {
      const value = json[key];
      if (typeof value === 'object') {
        const valueClassName = CASE_TYPES.find(
          (type) => type.key === 'camel_case'
        )?.getTextFromNormalText(key);
        const valueClassNameCapital =
          valueClassName[0].toUpperCase() + valueClassName.slice(1);
        fields.push({
          name: key,
          type: 'class',
          valueName: valueClassNameCapital,
        });

        const nestedClass = getClassStructures(value, valueClassNameCapital);

        nestedClasses.push(...nestedClass);
      } else {
        fields.push({
          name: key,
          type: 'string',
        });
      }
    }
  }

  const classStructure: ClassStructure = {
    name: className,
    fields: fields,
  };

  return [classStructure, ...nestedClasses];
}

export function getKotlinClass(
  json: object | Array<object>,
  className: string
): KotlinClass[] {
  return getClassStructures(json, className).map((classStructure) => {
    const classStart = `data class ${classStructure.name}(`;
    const classEnd = `)`;
    const fields = classStructure.fields.map((field) => {
      const fieldType = field.type === 'string' ? 'String' : field.valueName;
      return `${TAB}val ${field.name}: ${fieldType}`;
    });
    return [classStart, ...fields, classEnd].join('\n');
  });
}
