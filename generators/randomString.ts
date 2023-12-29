// import { faker } from "@faker-js/faker";

// export const generateBoardName = faker.company.name().replace(/\s/g, "");
export const generateRandomString = (prefix: string) => {
    return prefix + (Math.random() + 1).toString(36).substring(5);
}