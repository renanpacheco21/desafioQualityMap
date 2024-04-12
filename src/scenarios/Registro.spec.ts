import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import RegistroPage from '../support/pages/RegistroPage';

test.describe('Registration completion test', () => {
  let registroPage: RegistroPage;
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    registroPage = new RegistroPage(page);
    await page.goto(BASE_URL);
  });

  test('Register new user successfully', async () => {
    await registroPage.Given_that_access_to_registration_page();
    await registroPage.When_I_complete_the_registration();
    await registroPage.And_validates_the_completed_date_of_birth();
    await registroPage.Then_validate_the_registration_completed();
  });
});
