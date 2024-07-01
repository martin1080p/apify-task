import { compare } from '../helpers/helper.js';
import { Response } from '../types/response.js';

export class ResponseParser {
    response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    get products() {
        return this.response.products;
    }

    get total() {
        return this.response.total;
    }

    get count() {
        return this.response.count;
    }

    get lastProductPrice() {
        return this.products.sort(compare)[this.products.length - 1].price;
    }
}
