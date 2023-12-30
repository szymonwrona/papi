import { APIRequestContext, expect } from '@playwright/test';
import { baseURLs } from '../config/baseUrls';
import { authToken } from '../config/authToken';
import { updateBoard } from '../domain/updateBoard';


export class BoardAPI{

    private readonly base_url = baseURLs.apiURL();
    private readonly auth = authToken;

    async create(request: APIRequestContext, boardName: string){
        let url = `${this.base_url}/boards/?name=${boardName}&${this.auth}`;
        
        console.log(url);
        
        let response = await request.post(url);

        const body = await response.json();

        if(boardName !== "") {
            expect(response).toBeOK();
            expect(body.name).toBe(boardName);
            expect.soft(body.url).toContain(boardName.toLowerCase());
            expect.soft(body.url).toContain(body.shortUrl);
            
            console.log(`Board with id ${body.id} created`);
            process.env.BOARD_ID = body.id;

            return body.id;
        }

        else{
            expect(response.status()).toBe(400);
            expect(body.message).toBe("invalid value for name");
            expect.soft(body.error).toBe("ERROR");
        }
    }

    async get(request: APIRequestContext, boardId: string){
        let url = `${this.base_url}/boards/${boardId}?${this.auth}`;

        let response = await request.get(url);

        if(boardId !== "1"){
            await expect(response).toBeOK();

            const body = await response.json();
            expect(body.name).toBe(process.env.BOARD_NAME);
            expect.soft(body.url).toContain(process.env.BOARD_NAME);
            expect.soft(body.url).toContain(body.shortUrl);
        }
        else {
            expect(response.status()).toBe(400);
        }

    }

    async getAsNotAuthorizedUser(request: APIRequestContext, boardId: string, key = process.env.API_KEY){
        let url = `${this.base_url}/boards/${boardId}`;

        let json = {
            key: key,
            token: process.env.API_TOKEN as string
        }

        let response = await request.get(url, {data: json});
        
        expect(response.status()).toBe(401);
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