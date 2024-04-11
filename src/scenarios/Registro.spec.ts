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

  test('Registro de um novo usuário', async () => {
    await registroPage.Dado_que_acesso_a_pagina_registro();
    await registroPage.Quando_preencho_o_registro();
  });
});
