import { test } from '@playwright/test';
import { CardAPI } from '../requests/cards';

let card = new CardAPI();

test.describe("Let's create a few cards", () => {

    test('first request', async ({ request }) => {
        await card.create(request);
    });


    test('second request', async ({ request }) => {
        await card.create(request);
    });


    test('third request', async ({ request }) => {
        await card.create(request);
    });
});

test('Get information about card', async ({ request }) => {
    await card.get(request, process.env.CARD_ID as string);
});

