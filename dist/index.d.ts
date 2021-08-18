import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IR2CurlOptions } from './interface/IR2CurlOptions';
export default function r2curl(request: AxiosRequestConfig | AxiosResponse, option?: Partial<IR2CurlOptions>): string;
