import { Builder, Browser, By } from "selenium-webdriver";
import { signIn } from "./tests/signIn.js"
import { signOut } from "./tests/signOut.js"
import { wait } from "./utilities/utilities.js"
import { createAccount } from "./tests/createAccount.js";
import { changeEmail, changeEmailBadInputs } from "./tests/changeEmail.js";
import { changePassword, changePasswordBadInputs } from "./tests/changePassword.js";
import { deleteAccount } from "./tests/deleteAccount.js";
import { deleteVm } from "./tests/deleteVm.js";
import { createVm } from "./tests/createVm.js";
import { Options } from "selenium-webdriver/chrome.js";

const main = async () => {
    const options = new Options()
    options.addArguments("--start-fullscreen", "--force-dark-mode")    

    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();

    await driver.get(process.env.TEST_ENV_URL)    
    await wait(driver)

    try {
        // await createAccount(driver)
        // await signOut(driver)
        await signIn(driver, process.env.COGNITO_USERNAME, process.env.COGNITO_PASSWORD)

        await createVm(driver)
        await deleteVm(driver)

        // await changeEmailBadInputs(driver)
        // await changeEmail(driver)
        // await changePassword(driver)
        // await changePasswordBadInputs(driver)
        // await signOut(driver)
        // await signIn(driver, process.env.COGNITO_USERNAME, process.env.COGNITO_PASSWORD)
        // await deleteAccount(driver)
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await driver.quit()
    }
};

await main();
