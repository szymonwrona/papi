export class baseURLs {
    
  public static apiURL = process.env.TRELLO_ENV_STAGE === "1" ? 
      process.env.TRELLO_STAGE_ENV_URL as string 
      : process.env.TRELLO_TEST_ENV_URL as string
    
    public static authURL = process.env.AUTH_URL as string;
  }