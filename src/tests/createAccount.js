import { sleep, wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"
import { getCode } from "./getCode.js"
import assert from "assert"

export const createAccount = async (driver) => {
    const signInButton = await driver.findElement(By.id("sign-in"))
    await signInButton.click()
    await wait(driver)

    const createAccountLink = await driver.findElement(By.xpath("//*[text()='Create an account']"))
    await createAccountLink.click()
    await wait(driver)

    await sleep(driver)
    const usernameInput = await driver.findElement(By.name("username"))
    await usernameInput.sendKeys(process.env.COGNITO_USERNAME)
    await wait(driver)

    const emailInput = await driver.findElement(By.name("email"))
    await emailInput.sendKeys(process.env.COGNITO_EMAIL)
    await wait(driver)

    const passwordInput = await driver.findElement(By.name("password"))
    await passwordInput.sendKeys(process.env.COGNITO_PASSWORD)
    await wait(driver)

    const confirmPasswordInput = await driver.findElement(By.name("confirmPassword"))
    await confirmPasswordInput.sendKeys(process.env.COGNITO_PASSWORD)
    await wait(driver)

    const signUpButton = await driver.findElement(By.css("button[type='submit']"));
    await signUpButton.click()
    await wait(driver)

    const code = await getCode(driver)

    const codeInput = await driver.findElement(By.name("code"))
    await codeInput.sendKeys(code)

    const confirmAccountButton = await driver.findElement(By.xpath("//*[text()='Confirm account']"))
    await confirmAccountButton.click()
    await wait(driver)

    await sleep(driver)
}

export const createAccountWithBadInputs = async (driver) => {
    const signInButton = await driver.findElement(By.id("sign-in"))
    await signInButton.click()
    await wait(driver)

    const createAccountLink = await driver.findElement(By.xpath("//*[text()='Create an account']"))
    await createAccountLink.click()
    await wait(driver)
    await sleep(driver)

    const signUpButton = await driver.findElement(By.css("button[type='submit']"));
    await signUpButton.click()
    await wait(driver)

    await driver.findElement(By.xpath("//*[text()='Missing username.']"))
    await driver.findElement(By.xpath("//*[text()='Missing email address.']"))
    await driver.findElement(By.xpath("//*[text()='Password must not contain a leading or trailing space.']"))

    const usernameInput = await driver.findElement(By.name("username"))
    await usernameInput.sendKeys(process.env.COGNITO_USERNAME)
    await wait(driver)

    await signUpButton.click()
    await wait(driver)

    await driver.findElement(By.xpath("//*[text()='Missing email address.']"))
    await driver.findElement(By.xpath("//*[text()='Password must not contain a leading or trailing space.']"))

    const emailInput = await driver.findElement(By.name("email"))
    await emailInput.sendKeys(process.env.COGNITO_EMAIL)
    await wait(driver)

    await signUpButton.click()
    await wait(driver)

    const password = process.env.COGNITO_PASSWORD
    const passwordInput = await driver.findElement(By.name("password"))
    for (let i = 0; i < password.length; i++) {
        await passwordInput.sendKeys(password[i])
        await wait(driver)

        if (i < 5) {
            const sixChars = await driver.findElement(By.xpath("//*[text()='Password must be at least 6 character(s).']"))
            const color = await sixChars.getCssValue("color");
            assert(color, "rgba(217, 21, 21, 1)")
        }
    }

    const passwordReqs = [
        await driver.findElement(By.xpath("//*[text()='Password must be at least 6 characters']")),
        await driver.findElement(By.xpath("//*[text()='Use a number']")),
        await driver.findElement(By.xpath("//*[text()='Use a lowercase letter']")),
        await driver.findElement(By.xpath("//*[text()='Use an uppercase letter']")),
        await driver.findElement(By.xpath("//*[text()='Use a symbol']")),
    ]

    for (const req of passwordReqs) {
        const color = await req.getCssValue("color");
        assert(color, "rgba(3, 127, 12, 1)")
    }

    await signUpButton.click()
    await wait(driver)

    await driver.findElement(By.xpath("//*[text()='Password does not match.']"))

    const confirmPasswordInput = await driver.findElement(By.name("confirmPassword"))
    await confirmPasswordInput.sendKeys(process.env.COGNITO_PASSWORD)
    await wait(driver)

    await signUpButton.click()
    await wait(driver)

    await driver.findElement(By.xpath("//*[text()='Invalid input: User already exists ']"))
    await wait(driver)

    await driver.get(process.env.TEST_ENV_URL)
    await wait(driver)
    await sleep(driver)
}