import { By } from "selenium-webdriver"
import { sleep, wait } from "../utilities/utilities.js";

export const deleteVm = async (driver) => {
    await sleep(driver)

    const vmTableRow = driver.findElement(By.id("vm-row-0"))
    vmTableRow.click()
    await wait(driver)

    await sleep(driver)
    
    const deleteButton = driver.findElement(By.id("delete-button"))
    deleteButton.click()
    await wait(driver)

    await sleep(driver)

    const yesButton = driver.findElement(By.id("yes-button"))
    yesButton.click()
    await wait(driver)

    await driver.sleep(5000)
}