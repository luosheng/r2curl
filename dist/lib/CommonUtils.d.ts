import { IR2CurlOptions } from '../interface/IR2CurlOptions';
export default class CommonUtils {
    static bootstrap(options: IR2CurlOptions): void;
    static wrapQuote(content: string, params?: string): string;
    private static quote;
}
