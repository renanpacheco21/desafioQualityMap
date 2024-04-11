import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import RegistroPage from '../support/pages/RegistroPage';

test.describe('Teste de Preenchimento do Registro', () => {
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
});
