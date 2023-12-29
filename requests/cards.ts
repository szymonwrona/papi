import { APIRequestContext, expect } from '@playwright/test';
import { baseURLs } from '../config/baseUrls';
import { updateBoard } from '../domain/updateBoard';
import { generateRandomString } from '../generators/randomString';


export class CardAPI {

    private readonly base_url = baseURLs.apiURL();
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

    async get(request: APIRequestContext, cardId: string){
        let url = `${this.base_url}/cards/${cardId}`;

        let json = {
            key: process.env.API_KEY as string,
            token: process.env.API_TOKEN as string
        }

        let response = await request.get(url, {data: json});

        await expect(response).toBeOK();
    }

    async delete(request: APIRequestContext, cardId: string){
        let url = `${this.base_url}/cards/${cardId}`;
        let json = {
            key: process.env.API_KEY as string,
            token: process.env.API_TOKEN as string
        }

        let response = await request.delete(url, {data: json});
        await expect(response).toBeOK();
    }

}