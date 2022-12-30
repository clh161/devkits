import { CASE_TYPES } from '../page/CASE_TYPES';

const TAB = '    ';

type KotlinClass = {
  className: string;
  string: string;
};

type JsonStructure =
  | {
      name: string;
      isNullable: boolean;
      isOptional: boolean;
      type: 'string' | 'integer' | 'decimal' | 'any';
    }
  | {
      name: string;
      isNullable: boolean;
      isOptional: boolean;
      type: 'object' | 'array';
      fields: JsonStructure[];
    };

export function getClassStructures(
  json: object | Array<object>,
  rootName: string
): JsonStructure {
  if (json == null) {
    return {
      name: rootName,
      isNullable: true,
      isOptional: false,
      type: 'string',
    };
  } else if (Array.isArray(json)) {
    const groups = json
      .map((element) => getClassStructures(element, rootName))
      .flat()
      .reduce((group: { [key: string]: JsonStructure[] }, fieldStructure) => {
        if (fieldStructure.name in group) {
          group[fieldStructure.name].push(fieldStructure);
          return group;
        }
        group[fieldStructure.name] = [fieldStructure];
        return group;
      }, {});
    for (const field of Object.keys(groups)) {
      const types = groups[field].map((fieldStructure) => {
        return fieldStructure.type;
      });
      const uniqueTypes = new Set(types);

      const isNullable = groups[field].some((field) => field.isNullable);
      const isOptional = groups[field].length !== json.length;
      const fieldStructure =
        groups[field].find((field) => !field.isNullable) ?? groups[field][0];

      if (uniqueTypes.size === 1) {
        return { ...fieldStructure, isOptional, isNullable };
      } else {
        return { ...fieldStructure, isOptional, isNullable, type: 'any' };
      }
    }
  } else if (typeof json === 'object') {
    return {
      name: rootName,
      isNullable: false,
      isOptional: false,
      type: 'object',
      fields: Object.keys(json).map((key) =>
        getClassStructures(json[key], key)
      ),
    };
  } else if (typeof json === 'number') {
    if (Number.isInteger(json)) {
      return {
        name: rootName,
        isNullable: false,
        isOptional: false,
        type: 'integer',
      };
    } else {
      return {
        name: rootName,
        isNullable: false,
        isOptional: false,
        type: 'decimal',
      };
    }
  } else {
    return {
      name: rootName,
      isNullable: false,
      isOptional: false,
      type: 'string',
    };
  }
}

export function getKotlinClass(
  json: object | Array<object>,
  rootName: string
): KotlinClass[] {
  const queue = [getClassStructures(json, rootName)];
  const classes = [];
  while (queue.length !== 0) {
    const object = queue.pop();
    const className = getCapitalCamelCaseName(object.name);
    const classStart = `data class ${className}(`;
    const classEnd = `)`;
    if (object.type === 'object' || object.type === 'array') {
      const fields = [];
      for (const field of object.fields) {
        const fieldType = getKotlinFieldType(field);
        const nullSymbol = field.isNullable || field.isOptional ? '?' : '';
        fields.push(
          `${TAB}val ${getCamelCaseName(field.name)}: ${fieldType}${nullSymbol}`
        );
        if (field.type === 'array' || field.type === 'object') {
          queue.push(field);
        }
      }
      classes.push({
        className,
        string: [classStart, ...fields, classEnd].join('\n'),
      });
    }
  }
  return classes;
}

function getCamelCaseName(name: string) {
  return CASE_TYPES.find(
    (type) => type.key === 'camel_case'
  )?.getTextFromNormalText(name);
}

function getCapitalCamelCaseName(name: string) {
  const camelCaseName = getCamelCaseName(name);
  return camelCaseName[0].toUpperCase() + camelCaseName.slice(1);
}

export function getKotlinFieldType(field: JsonStructure): string {
  switch (field.type) {
    case 'string':
      return 'String';
    case 'integer':
      return 'Int';
    case 'decimal':
      return 'Float';
    case 'object':
      return getCapitalCamelCaseName(field.name);
    case 'array':
      return `List<${getCapitalCamelCaseName(field.name)}>`;
    case 'any':
      return `Any`;
  }
}
