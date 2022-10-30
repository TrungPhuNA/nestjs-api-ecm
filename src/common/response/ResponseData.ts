import { Paging } from './Paging';

export class ResponseData {
    readonly status: number;
    readonly message: string;
    readonly data: any;
    readonly meta?: Paging;
    readonly code?: number;

    constructor(status: number, data: any, message?: string, paging?: Paging, code?: number) {
        this.status = status;
        this.message = message || 'Success';
        this.data = data;
        this.meta = paging;
        this.code = code;
    }
}
