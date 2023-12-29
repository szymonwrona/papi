import { test as setup } from '@playwright/test';
import { BoardAPI } from '../../requests/board';


setup('cleanup: delete board', async ({ request }) => {
    let board = new BoardAPI();
    let boardId = process.env.BOARD_ID as string;
    
    await board.delete(request, boardId);
});

