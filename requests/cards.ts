import { APIRequestContext, expect, Page } from '@playwright/test';
import { baseURLs } from '../config/baseUrls';
import { generateRandomString } from '../generators/randomString';
import { getPerfMetrics } from '../performance/perf';


export class CardAPI {

    private readonly base_url = baseURLs.apiURL();
    public static cardsId: string[] = new Array();

    async create(page: Page, request: APIRequestContext){
        let url = `${this.base_url}/cards`;
        let json = {
            name : generateRandomString("Card "),
            idList: process.env.LIST_ID as string,
            key: process.env.API_KEY as string,
            token: process.env.API_TOKEN as string
        }

        let response = await request.post(url, {data: json});
        expect(response).toBeOK();
        const body = await response.json();
        
        CardAPI.cardsId.push(body.id);


        let metrics = await getPerfMetrics(page);
        expect(metrics[0].duration).toBeLessThanOrEqual(1500);

        return body.id;
    }

    async get(request: APIRequestContext, cardId: string){
        let url = `${this.base_url}/cards/${cardId}`;

        let json = {
            key: process.env.API_KEY as string,
            token: process.env.API_TOKEN as string
        }

        let response = await request.get(url, {data: json});

        await expect(response).toBeOK();
    }

    async delete(page: Page, request: APIRequestContext, cardId: string){
        let url = `${this.base_url}/cards/${cardId}`;
        let json = {
            key: process.env.API_KEY as string,
            token: process.env.API_TOKEN as string
        }

        let response = await request.delete(url, {data: json});
        await expect(response).toBeOK();
        
        let metrics = await getPerfMetrics(page);
        expect(metrics[0].duration).toBeLessThanOrEqual(1500);
    }

}