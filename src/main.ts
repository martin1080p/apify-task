import { Actor, Dataset } from 'apify';
import { HttpCrawler } from 'crawlee';

import { config } from './config.js';
import { generateRequest } from './helpers/helper.js';
import { ResponseParser } from './parsers/responseParser.js';
import { Input } from './types/input.js';
import { Product } from './types/product.js';
import { Response } from './types/response.js';

await Actor.main(async () => {
    const input = await Actor.getInput<Input>();
    if (!input) throw new Error('Input is missing!');

    const proxyConfiguration = await Actor.createProxyConfiguration();
    const allProducts: Product[] = [];

    const crawler = new HttpCrawler({
        proxyConfiguration,
        requestHandler: async ({ body }) => {
            const response: Response = JSON.parse(body.toString());
            const responseParser = new ResponseParser(response);

            const { products, total, lastProductPrice } = responseParser;

            allProducts.push(...products);

            if (allProducts.length < total) {
                await crawler.addRequests([generateRequest(
                    input.url,
                    lastProductPrice,
                    // Cannot put here only config.maximumPrice because it is not known if site is returning the products from the cheapest
                    Math.min(lastProductPrice + input.priceIncrement, config.maximumPrice),
                )]);
            }

            products.forEach(async (product) => {
                await Dataset.pushData(product);
            });
        },
    });

    await crawler.run([generateRequest(input.url, config.minimumPrice, config.minimumPrice + input.priceIncrement)]);
});
