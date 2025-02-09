import { By } from "selenium-webdriver";
import { sleep, wait } from "../utilities/utilities.js";

export const getCode = async (driver) => {
    await driver.executeScript("window.open('https://mail.google.com', '_blank');");
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);
    await wait(driver)

    const emailInput = await driver.findElement(By.id("identifierId"));
    emailInput.sendKeys(process.env.COGNITO_EMAIL)
    await wait(driver)

    const usernameNextButton = await driver.findElement(By.xpath("//*[text()='Next']"));
    usernameNextButton.click()
    await wait(driver)

    const passwordInput = await driver.findElement(By.name("Passwd"));
    passwordInput.sendKeys(process.env.COGNITO_PASSWORD)
    await wait(driver)

    await sleep(driver)
    const passwordNextButton = await driver.findElement(By.xpath("//*[text()='Next']"));
    passwordNextButton.click()
    await wait(driver)

    await sleep(driver)
    let codeEmail = await driver.findElement(By.xpath("//*[starts-with(text(), 'Your confirmation code is')]"));
    codeEmail = await codeEmail.getText();
    await wait(driver)

    const codeSplit = codeEmail.split(' ');

    await driver.switchTo().window(tabs[0]);
    await wait(driver)

    return codeSplit[codeSplit.length - 1];
}