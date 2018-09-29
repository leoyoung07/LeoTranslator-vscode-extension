interface ITranslator {
  Translate(text: string | undefined, options?: {fromLanguage: string, toLanguage: string}): Promise<string[]>;
}

interface IResult {
  dict: string[];

  web?: IWebResult[];
}

interface IWebResult {
  key: string;
  value: string[];
}

export { ITranslator, IResult };
