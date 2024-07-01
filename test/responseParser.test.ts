import { ResponseParser } from '../src/parsers/responseParser.js';
import { Response } from '../src/types/response.js';

describe('ResponseParser', () => {
    let response: Response;
    let parser: ResponseParser;

    beforeEach(() => {
        response = {
            products: [
                { name: 'Telefon', price: 10.5 },
                { name: 'Laptop', price: 899.99 },
                { name: 'Headphones', price: 199.99 },
                { name: 'Smartwatch', price: 299.99 },
                { name: 'Tablet', price: 499.99 },
                { name: 'Camera', price: 799.99 },
                { name: 'Printer', price: 149.99 },
                { name: 'Monitor', price: 229.99 },
                { name: 'Keyboard', price: 49.99 },
                { name: 'Mouse', price: 29.99 },
                { name: 'Speaker', price: 99.99 }
            ],
            total: 99999,
            count: 1000
        };
        parser = new ResponseParser(response);
    });

    test('should return the correct products', () => {
        expect(parser.products).toBe(response.products);
    });

    test('should return the correct total', () => {
        expect(parser.total).toBe(response.total);
    });

    test('should return the correct count', () => {
        expect(parser.count).toBe(response.count);
    });

    test('should return the correct last product price', () => {
        const compare = (a: { price: number }, b: { price: number }) => a.price - b.price;
        const lastProductPrice = response.products.sort(compare)[response.products.length - 1].price;
        expect(parser.lastProductPrice).toBe(lastProductPrice);
    });
});
