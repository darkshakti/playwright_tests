import { test, expect } from '@playwright/test';
import { VkIDLoginForm } from './vk-id-login-form';
import { VkComIDPage } from './vk-com-ID-page';
import { VkComHomePage } from './vk-com-home-page';

let vkIdLoginForm;
let vkComIDPage;
let vkComHomePage;

test.beforeEach(async ({ page }) => {
  vkIdLoginForm = new VkIDLoginForm(page);
  vkComIDPage = new VkComIDPage(page);
  vkComHomePage = new VkComHomePage(page);
  await vkIdLoginForm.goto();
});

test.afterEach(async ({ page }) => {
  // Clear cookies to ensure a clean state for the next test
  await page.context().clearCookies();
});

test('Should log in successfully with valid credentials', async ({ page }) => {
  // Type the login and password and click the login button
  await vkIdLoginForm.fillLogin('your-email@example.com');  //input your valid e-mail
  await vkIdLoginForm.clickSingIn();
  await vkComIDPage.fillPassword('your-password'); //input your valid password
  await vkComIDPage.clickContinue();


  // Check if the user is logged in
  await vkComHomePage.clickMyPage();
  const loggedInUsername = await vkComHomePage.checkOwnerName();
  expect(loggedInUsername).toBe('Your'); //input your valid name on vk.com
  await page.screenshot({ path: 'img/login.jpg' });
});

test('Should display an error message with invalid password', async ({ page }) => {
  // Type the valid login and invalid password and click the login button
  await vkIdLoginForm.fillLogin('ritma@bk.ru');  //input your valid email
  await vkIdLoginForm.clickSingIn();
  await vkComIDPage.fillPassword('4444#hgvhv449'); //input invalid password
  await vkComIDPage.clickContinue();

  // Check if the password failed and an error message is displayed
  const errorMessagePassword = await vkComIDPage.WrongPassword();
  expect(errorMessagePassword).toBeTruthy();
  await page.screenshot({ path: 'img/errorPasswordMessage.jpg' });
});

test('Should display an error message with invalid login', async ({ page }) => {
  // Type the login and password and click the login button
  await vkIdLoginForm.fillLogin('testik@gmail.com');  //input an invalid e-mail
  await vkIdLoginForm.clickSingIn();

  // Check if the password failed and an error message is displayed
  const errorMessageLogin = await vkComIDPage.WrongLogin();
  expect(errorMessageLogin).toBeTruthy(); 
  await page.screenshot({ path: 'img/errorLoginMessage.jpg' });
});