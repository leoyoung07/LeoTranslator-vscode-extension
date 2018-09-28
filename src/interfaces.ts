interface ITranslator {
  Translate(text: string, options?): Promise<string[]>;
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
