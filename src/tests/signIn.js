import { wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"

export const signIn = async (driver) => {
    const signInButton = await driver.findElement(By.id("sign-in"))
    await signInButton.click()
    await wait(driver)

    const usernameInput = await driver.findElement(By.name("username"))
    await usernameInput.sendKeys(process.env.COGNITO_USERNAME)
    await wait(driver)

    const nextButton = await driver.findElement(By.xpath("//*[text()='Next']"));
    await nextButton.click()
    await wait(driver)

    const passwordInput = await driver.findElement(By.name("password"))
    await passwordInput.sendKeys(process.env.COGNITO_PASSWORD)
    await wait(driver)

    const continueButton = await driver.findElement(By.xpath("//*[text()='Continue']"));
    await continueButton.click()
    await wait(driver)
}