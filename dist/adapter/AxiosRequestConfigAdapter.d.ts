import { AxiosRequestConfig } from 'axios';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';
import IRequestAdaptor from '../interface/IRequestAdaptor';
export declare class AxiosRequestConfigAdapter implements IRequestAdaptor {
    private readonly _prop;
    constructor(_prop: AxiosRequestConfig);
    get method(): HTTP_METHOD;
    get headers(): any;
    get body(): any;
    get url(): string;
    get params(): string | undefined;
}
