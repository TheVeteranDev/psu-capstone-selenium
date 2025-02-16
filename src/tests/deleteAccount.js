import { By } from "selenium-webdriver"
import { sleep, wait } from "../utilities/utilities.js";

export const deleteAccount = async (driver) => {
    const userIcon = driver.findElement(By.className("is-rounded"))

    const actions = driver.actions({ async: true });
    await actions.move({ origin: userIcon }).perform();
    await sleep(driver)

    const accountSettingsAnchor = await driver.findElement(By.id("account-settings-anchor"))
    await accountSettingsAnchor.click()
    await wait(driver)
    await sleep(driver)

    const deleteAccountButton = await driver.findElement(By.id("delete-account-button"))
    await deleteAccountButton.click()
    await wait(driver)
    await sleep(driver)

    const yesButton = await driver.findElement(By.id("yes-button"))
    await yesButton.click()
    await wait(driver)
    await driver.sleep(5000)
}