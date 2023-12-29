import { Page } from "@playwright/test";

export const getPerfMetrics = async (page: Page) => {
    
    let navigationJson = await page.evaluate(() => 
    JSON.stringify(performance.getEntriesByType('navigation')));

    return JSON.parse(navigationJson);
}