// flow-typed signature: 15fedd372959a5ac8611c4005e0c53a6
// flow-typed version: c6154227d1/he_v1.x.x/flow_>=v0.104.x

declare module 'he' {
  declare type encodeOptions = {
    useNamedReferences?: bool,
    decimal?: bool,
    encodeEverything?: bool,
    strict?: bool,
    allowUnsafeSymbols?: bool,
    ...
  };
  declare type decodeOptions = {
    isAttributeValue?: bool,
    strict?: bool,
    ...
  };
  declare module.exports: {
    version: string,
    encode: (text: string, options?: encodeOptions) => string & { options: encodeOptions, ... },
    decode: (text: string, options?: decodeOptions) => string & { options: decodeOptions, ... },
    escape(text: string): string,
    unescape(text: string, options?: encodeOptions): string,
    ...
  }
}
