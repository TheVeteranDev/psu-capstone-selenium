export const wait = async (driver) => {
    await driver.manage().setTimeouts({ implicit: 5000 });
}

export const sleep = async (driver) => {
    await driver.sleep(2000)
}