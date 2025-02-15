import { Builder, Browser, By } from "selenium-webdriver";
import { signIn } from "./tests/signIn.js"
import { signOut } from "./tests/signOut.js"
import { wait } from "./utilities/utilities.js"
import { createAccount } from "./tests/createAccount.js";
import { changeEmail } from "./tests/changeEmail.js";
import { changePassword } from "./tests/changePassword.js";

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get(process.env.TEST_ENV_URL)
    await wait(driver)

    try {
        await createAccount(driver)
        await signOut(driver)
        await signIn(driver, process.env.COGNITO_USERNAME, process.env.COGNITO_PASSWORD)
        await changeEmail(driver)
        await changePassword(driver)
        await signOut(driver)
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await driver.quit();
    }
};

await main();
