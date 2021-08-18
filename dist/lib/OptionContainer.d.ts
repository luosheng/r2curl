import { CURL_OPTIONS } from '../enum/CURL_OPTIONS';
export declare class OptionContainer {
    private options;
    constructor();
    add(command: CURL_OPTIONS, value?: string): void;
    toString(): string;
    ___reset(): void;
}
