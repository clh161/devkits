import pluralize from 'pluralize';

import { CASE_TYPES } from '../page/CASE_TYPES';

const TAB = '    ';

export type KotlinClass = {
  className: string;
  string: string;
  path: string[];
};

type JsonStructure =
  | {
      name: string;
      isNullable: boolean;
      isOptional: boolean;
      path: string[];
      type: 'string' | 'integer' | 'decimal' | 'any';
    }
  | {
      name: string;
      isNullable: boolean;
      isOptional: boolean;
      path: string[];
      type: 'object' | 'array';
      fields: JsonStructure[];
    };

export function getClassStructures(
  json: object | Array<object>,
  rootName: string,
  path: string[] = []
): JsonStructure {
  const newPath = [...path, rootName];
  if (json == null) {
    return {
      name: rootName,
      isNullable: true,
      isOptional: false,
      type: 'string',
      path: newPath,
    };
  } else if (Array.isArray(json)) {
    const groups = json
      .map((element) => getClassStructures(element, rootName), newPath)
      .flat()
      .reduce((group: { [key: string]: JsonStructure[] }, fieldStructure) => {
        if (fieldStructure.name in group) {
          group[fieldStructure.name].push(fieldStructure);
          return group;
        }
        group[fieldStructure.name] = [fieldStructure];
        return group;
      }, {});
    const fields: JsonStructure[] = Object.keys(groups).map((field) => {
      const types = groups[field].map((fieldStructure) => {
        return fieldStructure.type;
      });
      const uniqueTypes = new Set(types);

      const isNullable = groups[field].some((field) => field.isNullable);
      const isOptional = groups[field].length !== json.length;
      const fieldStructure =
        groups[field].find((field) => !field.isNullable) ?? groups[field][0];

      if (uniqueTypes.size === 1) {
        return {
          ...fieldStructure,
          isOptional,
          isNullable,
          path: [...newPath, field],
        };
      } else {
        return {
          ...fieldStructure,
          isOptional,
          isNullable,
          type: 'any',
          path: [...newPath, field],
        };
      }
    });
    return {
      name: rootName,
      isNullable: false,
      isOptional: false,
      path: newPath,
      type: 'array',
      fields: fields,
    };
  } else if (typeof json === 'object') {
    return {
      name: rootName,
      isNullable: false,
      isOptional: false,
      path: newPath,
      type: 'object',
      fields: Object.keys(json).map((key) =>
        getClassStructures(json[key], key, newPath)
      ),
    };
  } else if (typeof json === 'number') {
    if (Number.isInteger(json)) {
      return {
        name: rootName,
        isNullable: false,
        isOptional: false,
        path: newPath,
        type: 'integer',
      };
    } else {
      return {
        name: rootName,
        isNullable: false,
        isOptional: false,
        path: newPath,
        type: 'decimal',
      };
    }
  } else {
    return {
      name: rootName,
      isNullable: false,
      isOptional: false,
      path: newPath,
      type: 'string',
    };
  }
}

export function getKotlinClass(
  json: object | Array<object>,
  packageName: string,
  rootName: string
): KotlinClass[] {
  const queue = [getClassStructures(json, rootName)];
  const classes: KotlinClass[] = [];
  while (queue.length !== 0) {
    const object = queue.pop();
    const className = getCapitalCamelCaseName(pluralize.singular(object.name));
    const classStart = `data class ${className}(`;
    const classEnd = `)`;
    if (object.type === 'object') {
      const fields = [];
      for (const field of object.fields) {
        const fieldType = getKotlinFieldType(field);
        const nullSymbol = field.isNullable || field.isOptional ? '?' : '';
        fields.push(
          `${TAB}val ${getCamelCaseName(
            field.name
          )}: ${fieldType}${nullSymbol},`
        );
        if (field.type === 'array' || field.type === 'object') {
          queue.push(field);
        }
      }
      classes.push({
        className,
        string: [packageName + '\n', classStart, ...fields, classEnd].join(
          '\n'
        ),
        path: object.path.map((p) => getCapitalCamelCaseName(p)),
      });
    }
    if (object.type === 'array') {
      queue.push(...object.fields);
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
      return getCapitalCamelCaseName(pluralize.singular(field.name));
    case 'array': {
      return `List<${getCapitalCamelCaseName(pluralize.singular(field.name))}>`;
    }
    case 'any':
      return `Any`;
  }
}
