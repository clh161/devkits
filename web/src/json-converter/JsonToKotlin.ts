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
      isOptional: boolean;
      type: 'string' | 'integer' | 'decimal';
    }
  | {
      name: string;
      isNullable: boolean;
      isOptional: boolean;
      type: 'class' | 'array';
      className: string;
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
      isOptional: false,
      type: 'string',
    });
  } else if (Array.isArray(json)) {
    const classStructures = json
      .map((object) => getClassStructures(object, ''))
      .flat();
    const groups = classStructures
      .map((classStructure) => classStructure.fields)
      .flat()
      .reduce((group: { [key: string]: FieldStructure[] }, fieldStructure) => {
        if (fieldStructure.name in group) {
          group[fieldStructure.name].push(fieldStructure);
          return group;
        }
        group[fieldStructure.name] = [fieldStructure];
        return group;
      }, {});

    const fields: FieldStructure[] = [];
    for (const field of Object.keys(groups)) {
      const types = groups[field].map((fieldStructure) => {
        return fieldStructure.type;
      });
      const uniqueTypes = new Set(types);

      const isNullable = groups[field].some((field) => field.isNullable);
      const isOptional = groups[field].length !== json.length;

      if (uniqueTypes.size === 1) {
        const fieldStructure =
          groups[field].find((field) => !field.isNullable) ?? groups[field][0];

        fields.push({ ...fieldStructure, isOptional, isNullable });
      }
    }

    return [
      {
        name: className,
        fields: fields,
      },
    ];
  } else if (typeof json === 'object') {
    const keys = Object.keys(json);
    for (const key of keys) {
      const value = json[key];

      if (Array.isArray(value)) {
        const keyName = CASE_TYPES.find(
          (type) => type.key === 'camel_case'
        )?.getTextFromNormalText(key);

        const newClassName =
          className + keyName[0].toUpperCase() + keyName.slice(1);

        fields.push({
          name: key,
          isNullable: false,
          isOptional: false,
          type: 'array',
          className: newClassName,
        });

        nestedClasses.push(...getClassStructures(value, newClassName));
      } else if (typeof value === 'object') {
        const valueClassName = CASE_TYPES.find(
          (type) => type.key === 'camel_case'
        )?.getTextFromNormalText(key);
        const valueClassNameCapital =
          valueClassName[0].toUpperCase() + valueClassName.slice(1);
        fields.push({
          name: key,
          isNullable: false,
          isOptional: false,
          type: 'class',
          className: valueClassNameCapital,
        });

        const nestedClass = getClassStructures(value, valueClassNameCapital);

        nestedClasses.push(...nestedClass);
      } else if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          fields.push({
            name: key,
            isNullable: false,
            isOptional: false,
            type: 'integer',
          });
        } else {
          fields.push({
            name: key,
            isNullable: false,
            isOptional: false,
            type: 'decimal',
          });
        }
      } else {
        fields.push({
          name: key,
          isNullable: false,
          isOptional: false,
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
      const nullSymbol = field.isNullable || field.isOptional ? '?' : '';
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
      return field.className;
    case 'array':
      return `List<${field.className}>`;
  }
}
