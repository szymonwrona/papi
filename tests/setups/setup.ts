import { test as setup } from '@playwright/test';
import { BoardAPI } from '../../requests/board';
import { generateRandomString } from '../../generators/randomString';
import { ListAPI } from '../../requests/list';
import { CardAPI } from '../../requests/cards';


setup('setup: add board', async ({ page, request }) => {
    await setup.step(`create list during setup`, async () => {
        let board = new BoardAPI();
        process.env.BOARD_NAME = generateRandomString("board");
        await board.create(page, request, process.env.BOARD_NAME);
    });

    await setup.step(`create a list during setup`, async () => {
        let list = new ListAPI();
        await list.create(page, request);
    });

    await setup.step(`create first card during setup`, async () => {
        let card = new CardAPI();
        let cardId = await card.create(page, request);
        process.env.CARD_ID = cardId;
        console.log(`Card with id ${cardId} created`)
    });
});

