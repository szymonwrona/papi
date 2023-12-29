import { test } from '@playwright/test';
import { CardAPI } from '../requests/cards';

let card = new CardAPI();

test.describe("Let's create a few cards", () => {

    test('first request', async ({ page, request }) => {
        await card.create(page, request);
    });


    test('second request', async ({ page, request }) => {
        await card.create(page, request);
    });


    test('third request', async ({ page, request }) => {
        await card.create(page, request);
    });
});

test('Get information about card', async ({ request }) => {
    await card.get(request, process.env.CARD_ID as string);
});

