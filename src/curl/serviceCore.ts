import {Injectable} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ServiceCore {
    private headers: {};

    constructor(private readonly http: HttpService) {
        this.headers = {
            // 'X-Port-Type': 'ADV',
            // 'Authorization': ACCESSTRADE_AUTH.BEARER
        };
    }

    async getLinkPaymentVnpay(data: any) {
        try {
            return await this.http
                .post(`http://cms-api.123code.net/api/gen-payment-vnpay`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .pipe(map(response => response.data))
                .toPromise();
        } catch (e) {
            throw e;
        }
    }
}
