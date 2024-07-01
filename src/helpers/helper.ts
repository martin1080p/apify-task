import { RequestOptions } from 'crawlee';

import { RequestBuilder } from '../builders/requestBuilder.js';
import { Product } from '../types/product.js';

export function generateRequest(url: string, minimumPrice: number, maximumPrice: number): RequestOptions {
    const requestBuilder = new RequestBuilder(url);

    const request = requestBuilder
        .addMinimumPrice(minimumPrice)
        .addMaximumPrice(maximumPrice)
        .build();

    return request;
}

export function compare(a: Product, b: Product) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}
