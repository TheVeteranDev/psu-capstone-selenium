import { sleep, wait } from "../utilities/utilities.js"
import { By } from "selenium-webdriver"
import assert from "assert"

export const changeEmail = async (driver) => {
    const emails = [process.env.COGNITO_EMAIL_CHANGE, process.env.COGNITO_EMAIL]

    const userIcon = driver.findElement(By.className("is-rounded"))

    const actions = driver.actions({ async: true });
    await actions.move({ origin: userIcon }).perform();
    await sleep(driver)

    const accountSettingsAnchor = await driver.findElement(By.id("account-settings-anchor"))
    await accountSettingsAnchor.click()
    await wait(driver)
    await sleep(driver)

    for (const email of emails) {
        const changeEmailButton = await driver.findElement(By.id("change-email-button"))
        await changeEmailButton.click()
        await wait(driver)

        const newEmailInput = await driver.findElement(By.id("email-input"))
        await newEmailInput.sendKeys(email)
        await wait(driver)

        let submitButtonButton = await driver.findElement(By.id("change-email-submit-button"))
        await submitButtonButton.click()
        await wait(driver)

        await driver.sleep(5000)

        const emailText = await driver.findElement(By.xpath(`//*[text()='${email}']`))
        assert(await emailText.getText(), email)
        await wait(driver)
        await driver.sleep(2000)
    }
}

export const changeEmailBadInputs = async (driver) => {
    const userIcon = driver.findElement(By.className("is-rounded"))

    const actions = driver.actions({ async: true });
    await actions.move({ origin: userIcon }).perform();
    await sleep(driver)

    const accountSettingsAnchor = await driver.findElement(By.id("account-settings-anchor"))
    await accountSettingsAnchor.click()
    await wait(driver)
    await sleep(driver)

    const changeEmailButton = await driver.findElement(By.id("change-email-button"))
    await changeEmailButton.click()
    await wait(driver)

    const newEmailInput = await driver.findElement(By.id("email-input"))
    await newEmailInput.sendKeys("bad email input")
    await wait(driver)

    const submitButtonButton = await driver.findElement(By.id("change-email-submit-button"))
    await submitButtonButton.click()
    await wait(driver)

    await driver.sleep(5000)

    const cancelButton = await driver.findElement(By.id("cancel-button"))
    await cancelButton.click()
    await wait(driver)
}