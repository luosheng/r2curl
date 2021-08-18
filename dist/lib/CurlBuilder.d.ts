import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import IRequestAdaptor from '../interface/IRequestAdaptor';
export declare class CurlBuilder {
    private readonly _adap;
    private readonly _option;
    private optionContainer;
    constructor(_adap: IRequestAdaptor, _option: IR2CurlOptions);
    get method(): string;
    get headers(): string;
    get body(): string;
    get url(): string;
    toString(): string;
}
