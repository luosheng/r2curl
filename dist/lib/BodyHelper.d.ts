export declare class BodyHelper {
    private readonly _headers;
    private readonly _rawBody;
    private contentType;
    private body;
    constructor(_headers: {
        [key in string]: string;
    }, _rawBody: {
        [key in string]: any;
    } | Array<{
        [key in string]: any;
    }>);
    toString(): string;
    private getContentType;
    private parseBody;
    private getFormBody;
    private getTextBody;
}
