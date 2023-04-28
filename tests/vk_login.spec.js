const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://vk.com');
  });

test.afterEach(async ({ page }) => {
    // Clear cookies to ensure a clean state for the next test
    await page.context().clearCookies();
  });

test('Log in successfully with valid credentials', async ({ page }) => {
  // Type the login and password and click the login button
    await page.fill('#index_email', 'your_email'); //put your valid email
    await page.locator('xpath=//button[@type=\'submit\']').click();
    await page.fill('xpath=//input[@name=\'password\']', 'your_password'); //put your valid password
    await page.locator('.vkuiButton').click();
   
 // Check if the user is logged in
  await page.locator('xpath=//*[@class=\'TopNavBtn__profileImg\']').click(); 
  const loggedInUsername = await page.innerText('.EcosystemAccountMenuUser_name__myd8c');
  expect(loggedInUsername).toBe('Your Name'); //put your valid name on vk.com
   await page.screenshot({ path: 'img/login.jpg' });
});