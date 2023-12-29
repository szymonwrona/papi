import { test } from '@playwright/test';
import { BoardAPI } from '../requests/board';

let board = new BoardAPI();
let boardId = process.env.BOARD_ID as string;

test('Get information about a board', async ({ request }) => {
    await board.get(request, boardId);
});
   

test('Update a board', async ({ request }) => {
    await board.update(request, boardId, { desc: "test" });
});


test('400 error when creating board with empty name', async ({ page, request }) => {
    await board.create(page, request, "");
});


test('401 error when authorizing with not existing key', async ({ request }) => {
    await board.getAsNotAuthorizedUser(request, boardId, "1");
});


test('400 error when getting information about not existing board', async ({ request }) => {
    await board.get(request, "1");
});
