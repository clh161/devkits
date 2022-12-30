const TAB = '    ';

export function getKotlinClass(jsonString: string): string {
  const className = 'My Class';
  const classStart = `data class ${className}(`;
  const json = JSON.parse(jsonString);
  const fields = getFields(json);
  const classEnd = `)`;

  return [classStart, fields, classEnd].join('\n');
}

function getFields(json: unknown): string {
  if (typeof json === 'object') {
    const keys = Object.keys(json);
    return keys.map((key) => `${TAB}val ${key} string`).join('\n');
  }
  return '';
}
