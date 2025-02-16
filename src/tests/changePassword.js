import { sleep, wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"
import { signOut } from "./signOut.js"
import { signIn } from "./signIn.js"

export const changePassword = async (driver) => {
    const passwords = [
        { old: process.env.COGNITO_PASSWORD, new: process.env.COGNITO_PASSWORD_CHANGE },
        { old: process.env.COGNITO_PASSWORD_CHANGE, new: process.env.COGNITO_PASSWORD },
    ]

    await sleep(driver)

    for (const password of passwords) {
        const userIcon = driver.findElement(By.className("is-rounded"))

        const actions = driver.actions({ async: true });
        await actions.move({ origin: userIcon }).perform();
        await sleep(driver)

        const accountSettingsAnchor = await driver.findElement(By.id("account-settings-anchor"))
        await accountSettingsAnchor.click()
        await wait(driver)
        await sleep(driver)

        const changePasswordButton = await driver.findElement(By.id("change-password-button"))
        await changePasswordButton.click()
        await wait(driver)

        const oldPasswordInput = await driver.findElement(By.id("old-password-input"))
        await oldPasswordInput.sendKeys(password.old)
        await wait(driver)

        const newPasswordInput = await driver.findElement(By.id("password-input"))
        await newPasswordInput.sendKeys(password.new)
        await wait(driver)

        const confirmNewPasswordInput = await driver.findElement(By.id("confirm-password-input"))
        await confirmNewPasswordInput.sendKeys(password.new)
        await wait(driver)

        const submitButton = await driver.findElement(By.id("change-password-submit-button"))
        await submitButton.click()
        await wait(driver)

        await driver.sleep(5000)

        await signOut(driver)
        await sleep(driver)

        await signIn(driver, process.env.COGNITO_USERNAME, password.new)
        await sleep(driver)
    }
}

export const changePasswordBadInputs = async (driver) => {
    const userIcon = driver.findElement(By.className("is-rounded"))

    const actions = driver.actions({ async: true });
    await actions.move({ origin: userIcon }).perform();
    await sleep(driver)

    const accountSettingsAnchor = await driver.findElement(By.id("account-settings-anchor"))
    await accountSettingsAnchor.click()
    await wait(driver)
    await sleep(driver)

    const changePasswordButton = await driver.findElement(By.id("change-password-button"))
    await changePasswordButton.click()
    await wait(driver)

    const oldPasswordInput = await driver.findElement(By.id("old-password-input"))
    await oldPasswordInput.sendKeys("oldpassword")
    await wait(driver)

    const newPasswordInput = await driver.findElement(By.id("password-input"))
    await newPasswordInput.sendKeys("newpassword")
    await wait(driver)

    const confirmNewPasswordInput = await driver.findElement(By.id("confirm-password-input"))
    await confirmNewPasswordInput.sendKeys("newpassword")
    await wait(driver)

    const submitButton = await driver.findElement(By.id("change-password-submit-button"))
    await submitButton.click()
    await wait(driver)

    await sleep(driver)

    const cancelButton = await driver.findElement(By.id("cancel-password-change-button"))
    await cancelButton.click()
    await wait(driver)


}