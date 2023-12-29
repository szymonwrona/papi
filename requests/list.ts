import { APIRequestContext, expect, Page } from '@playwright/test';
import { baseURLs } from '../config/baseUrls';
import listJson from "../assets/list.json"
import { getPerfMetrics } from '../performance/perf';

export class ListAPI {

    private readonly base_url = baseURLs.apiURL();

    async create(page: Page, request: APIRequestContext, name = "test"){
        let url = `${this.base_url}/lists`;
        
        listJson.name = name,
        listJson.idBoard = process.env.BOARD_ID as string,
        listJson.key = process.env.API_KEY as string,
        listJson.token = process.env.API_TOKEN as string

        let response = await request.post(url, {data: listJson});

        await expect(response).toBeOK();
        const body = await response.json();
        expect(body.name).toBe(name);

        let metrics = await getPerfMetrics(page);
        expect(metrics[0].duration).toBeLessThanOrEqual(1500);
        
        process.env.LIST_ID = body.id;
        console.log(`List with id ${body.id} created`);
    }
}