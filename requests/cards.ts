import { APIRequestContext, expect } from '@playwright/test';
import { baseURLs } from '../config/baseUrls';
import { updateBoard } from '../domain/updateBoard';
import { generateRandomString } from '../generators/randomString';


export class CardAPI {

    private readonly base_url = baseURLs.apiURL;
    cardsId: string[] = [];

    async create(request: APIRequestContext){
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
        
        this.cardsId.push(body.id);
        return body.id;
    }

    async get(request: APIRequestContext, boardId: string){
        let url = `${this.base_url}/boards/${boardId}?${this.auth}`;

        let response = await request.get(url);

        await expect(response).toBeOK();

        const body = await response.json();
        expect(body.name).toBe(process.env.BOARD_NAME);
        expect.soft(body.url).toContain(process.env.BOARD_NAME);
        expect.soft(body.url).toContain(body.shortUrl);
    }

    async update(request: APIRequestContext, boardId: string, body: updateBoard){
        let url = `${this.base_url}/boards/${boardId}?${this.auth}`;

        let response = await request.put(url, {data: body});
        // console.log(response.status());
        // console.log(await response.json());

        await expect(response).toBeOK();
        const responseBody = await response.json();
        expect.soft(responseBody.desc).toContain(body.desc);
    }

    async delete(request: APIRequestContext, boardId: string){
        let url = `${this.base_url}/boards/${boardId}?${this.auth}`;

        let response = await request.delete(url);

        await expect(response).toBeOK();
    }

}