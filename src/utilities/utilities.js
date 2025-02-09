export const wait = async (driver) => {
    await driver.manage().setTimeouts({ implicit: 5000 });
}