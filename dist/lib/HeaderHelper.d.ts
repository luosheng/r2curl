import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import { OptionContainer } from './OptionContainer';
declare type HttpHeaderType = {
    [key in string]: string;
};
export declare class HeaderHelper {
    private readonly _rawHeaders;
    private readonly _method;
    private readonly _curlOptionContainer;
    private readonly _option;
    private headers;
    private keys;
    private pairs;
    private defaultContentType;
    constructor(_rawHeaders: HttpHeaderType, _method: string, _curlOptionContainer: OptionContainer, _option: IR2CurlOptions);
    toObject(): {
        [x: string]: string;
    };
    private parseHeader;
    private parseContentHeader;
    private judgeAcceptEncoding;
}
export {};
