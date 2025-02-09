import { Builder, Browser, By } from "selenium-webdriver";
import { login } from "./tests/login.js"
import { wait } from "./utilities/utilities.js"

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    driver.get("http://localhost:5000")
    await wait(driver)

    try {
        await login(driver)
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await driver.quit();
    }
};

await main();
