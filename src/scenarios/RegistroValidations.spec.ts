import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import RegistroPage from '../support/pages/RegistroPage';

test.describe('Validation tests during registration', () => {
  let registroPage: RegistroPage;
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    registroPage = new RegistroPage(page);
    await page.goto(BASE_URL);
  });

  test('Validate all required fields', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_confirm_the_registration();
    await registroPage.Then_validate_all_required_fields();
  });

  test('Password validation number of characters', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_you_enter_an_incomplete_password();
    await registroPage.Then_validate_the_password_character_rule();
  });

  test('Validation confirmation of different password', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_entering_the_password_and_confirmation();
    await registroPage.Then_validate_password_confirmation();
  });

  test('Incorrect email validation', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_typing_incomplete_email();
    await registroPage.Then_validate_the_incorrect_email();
  });

  test('Incorrect email with complete registration', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_I_complete_the_registration();
    await registroPage.And_enter_incomplete_email();
    await registroPage.Then_validate_the_incorrect_email_in_the_complete_registration();
  });
});
