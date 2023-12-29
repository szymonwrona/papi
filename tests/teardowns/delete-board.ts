import { test as teardown } from '@playwright/test';
import { BoardAPI } from '../../requests/board';
import { CardAPI } from '../../requests/cards';


teardown('cleanup: delete card and board', async ({ page, request }) => {
    let card = new CardAPI()
    let board = new BoardAPI();

    let cardId = process.env.CARD_ID as string;
    let boardId = process.env.BOARD_ID as string;
    
    await card.delete(page, request, cardId);
    await board.delete(request, boardId);
});

