import { sleep, wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"

export const signIn = async (driver, username, password) => {
    const homePageSignInButton = await driver.findElement(By.id("navbar-sign-in-button"))
    await homePageSignInButton.click()
    await wait(driver)

    await sleep(driver)
    const usernameInput = await driver.findElement(By.id("username-input"))
    await usernameInput.sendKeys(username)
    await wait(driver)

    const passwordInput = await driver.findElement(By.id("password-input"))
    await passwordInput.sendKeys(password)
    await wait(driver)

    const signInButton = await driver.findElement(By.id("sign-in-button"));
    await signInButton.click()
    await wait(driver)
}