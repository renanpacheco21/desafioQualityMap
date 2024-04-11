import { Page } from '@playwright/test';
import RegistroPageElements from '../elements/RegistroElements';
import BasePage from './BasePage';

export default class RegistroPage extends BasePage {
  readonly registroElements: RegistroPageElements;

  constructor(readonly page: Page) {
    super(page);
    this.registroElements = new RegistroPageElements(page);
  }

  async Dado_que_estou_na_pagina_registro(): Promise<void> {
    await this.registroElements.getBotaoRegister().click();
  }
}
