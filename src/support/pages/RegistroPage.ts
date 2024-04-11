import { Page } from '@playwright/test';
import RegistroPageElements from '../elements/RegistroElements';
import BasePage from './BasePage';

export default class RegistroPage extends BasePage {
  readonly registroElements: RegistroPageElements;

  constructor(readonly page: Page) {
    super(page);
    this.registroElements = new RegistroPageElements(page);
  }

  async Dado_que_acesso_a_pagina_registro(): Promise<void> {
    await this.registroElements.getRegister().click();
  }

  async Quando_preencho_o_registro(): Promise<void> {
    await this.registroElements.getGenderMale().click();
    await this.registroElements.getFirstName().type('Joao');
    await this.registroElements.getLastName().type('Silva');
    await this.registroElements.getDay().type('10');
    await this.registroElements.getMonth().type('April');
    await this.registroElements.getYear().type('1994');
    await this.registroElements.getEmail().type('teste@teste.br');
  }
}

// // Verificar se a opção foi selecionada corretamente
//   const selectedOption = await page.$eval('select[name="DateOfBirthDay"]', el => el.value);
//   expect(selectedOption).toBe('15');
