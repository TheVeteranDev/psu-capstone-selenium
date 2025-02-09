import { sleep, wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"

export const signOut = async (driver) => {
    const userIcon = driver.findElement(By.className("is-rounded"))

    const actions = driver.actions({ async: true });
    await actions.move({ origin: userIcon }).perform();
    await sleep(driver)

    const signOutButton = await driver.findElement(By.id("sign-out"))
    await signOutButton.click()
    await wait(driver)
}