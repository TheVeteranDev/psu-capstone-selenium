import { By } from "selenium-webdriver"
import { sleep, wait } from "../utilities/utilities.js";

export const createVm = async (driver) => {
    await sleep(driver)

    const createButton = driver.findElement(By.id("create-vm-button"))
    createButton.click()
    await wait(driver)

    await sleep(driver)

    const nameInput = await driver.findElement(By.id("name-input"))
    await nameInput.sendKeys("test-vm")
    await wait(driver)

    const submitButton = await driver.findElement(By.id("yes-button"))   
    submitButton.click()
    await wait(driver)

    await driver.sleep(2000)

    await driver.findElement(By.className("fa-solid fa-spinner spinner"))
    await wait(driver)

    await driver.sleep(30000)

    await driver.findElement(By.className("fa-solid fa-circle-check"))
    await wait(driver)
}