import { RequestOptions } from 'crawlee';

export class RequestBuilder {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    addMinimumPrice(minimumPrice: number): RequestBuilder {
        this.checkParamReady();
        this.url += `minPrice=${minimumPrice}&`;
        return this;
    }

    addMaximumPrice(maximumPrice: number): RequestBuilder {
        this.checkParamReady();
        this.url += `maxPrice=${maximumPrice}&`;
        return this;
    }

    checkParamReady() {
        if (!this.url.includes('?')) {
            this.url += '?';
        }
    }

    build(): RequestOptions {
        return {
            url: this.url,
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        };
    }
}
