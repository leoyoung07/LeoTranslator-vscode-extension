interface ITranslator {
    Translate(text: string, options?): Promise<IResult>;
}

interface IResult {
    dict: string[];

    web?: string[];
}

export {ITranslator, IResult};