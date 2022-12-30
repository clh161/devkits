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
      isNullable: boolean;
      type: 'string' | 'integer' | 'decimal';
    }
  | {
      name: string;
      isNullable: boolean;
      type: 'class';
      valueName: string;
    };

function getClassStructures(
  json: object | Array<object>,
  className: string
): ClassStructure[] {
  const fields: FieldStructure[] = [];
  const nestedClasses: ClassStructure[] = [];

  if (json == null) {
    fields.push({
      name: className,
      isNullable: true,
      type: 'string',
    });
  } else if (typeof json === 'object') {
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
          isNullable: false,
          type: 'class',
          valueName: valueClassNameCapital,
        });

        const nestedClass = getClassStructures(value, valueClassNameCapital);

        nestedClasses.push(...nestedClass);
      } else if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          fields.push({
            name: key,
            isNullable: false,
            type: 'integer',
          });
        } else {
          fields.push({
            name: key,
            isNullable: false,
            type: 'decimal',
          });
        }
      } else {
        fields.push({
          name: key,
          isNullable: false,
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
      const fieldType = getKotlinFieldType(field);
      const nullSymbol = field.isNullable ? '?' : '';
      return `${TAB}val ${field.name}: ${fieldType}${nullSymbol}`;
    });
    return [classStart, ...fields, classEnd].join('\n');
  });
}

export function getKotlinFieldType(field: FieldStructure): string {
  switch (field.type) {
    case 'string':
      return 'String';
    case 'integer':
      return 'Int';
    case 'decimal':
      return 'Float';
    case 'class':
      return field.valueName;
  }
}
