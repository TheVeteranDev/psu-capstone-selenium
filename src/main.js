import { Builder, Browser, By } from "selenium-webdriver";
import { signIn } from "./tests/signIn.js"
import { signOut } from "./tests/signOut.js"
import { wait } from "./utilities/utilities.js"
import { createAccount, createAccountWithBadInputs } from "./tests/createAccount.js";

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get(process.env.TEST_ENV_URL)
    await wait(driver)

    try {
        await createAccount(driver)
        await signOut(driver)
        await signIn(driver)
        await signOut(driver)
        await createAccountWithBadInputs(driver)
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await driver.quit();
    }
};

await main();
