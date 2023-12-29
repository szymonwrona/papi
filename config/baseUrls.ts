export class baseURLs {
  
  
  public static apiURL = (): string => {
    let env = process.env.TRELLO_ENV as string;

    if(env.toLowerCase() === "test"){
      return process.env.TRELLO_TEST_ENV_URL as string;
    }
    else if(env.toLowerCase() === "stage"){
      return process.env.TRELLO_STAGE_ENV_URL as string;
    }
    else{
      return process.env.TRELLO_PROD_ENV_URL as string;
    }
  }

  // public static apiURL = process.env.TRELLO_ENV_STAGE === "1" ? 
  //     process.env.TRELLO_STAGE_ENV_URL as string 
  //     : process.env.TRELLO_TEST_ENV_URL as string
    
    public static authURL = process.env.AUTH_URL as string;
  }