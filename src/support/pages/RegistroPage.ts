import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import RegistroPageElements from '../elements/RegistroElements';
import BasePage from './BasePage';

export default class RegistroPage extends BasePage {
  readonly registroElements: RegistroPageElements;

  constructor(readonly page: Page) {
    super(page);
    this.registroElements = new RegistroPageElements(page);
  }

  async Given_that_access_to_registration_page(): Promise<void> {
    await this.registroElements.getRegister().click();
  }

  async When_I_complete_the_registration(): Promise<void> {
    await this.registroElements.getGenderMale().click();
    await this.registroElements.getFirstName().fill('Joao');
    await this.registroElements.getLastName().fill('Silva');
    await this.registroElements.getDay().type('10');
    await this.registroElements.getMonth().type('April');
    await this.registroElements.getYear().type('1994');
    await this.registroElements.getEmail().fill(faker.internet.email());
    await this.registroElements.getCompanyName().fill('QA-Automation');
    await this.registroElements.getNewsletter().click();
    await this.registroElements.getPassword().fill('123456');
    await this.registroElements.getConfirmPassword().fill('123456');
  }

  async And_validates_the_completed_date_of_birth(): Promise<void> {
    const selectedDay = await this.registroElements.getDay().inputValue();
    expect(selectedDay).toBe('10');
    const selectedMonth = await this.registroElements.getMonth().inputValue();
    expect(selectedMonth).toBe('4');
    const selectedYear = await this.registroElements.getYear().inputValue();
    expect(selectedYear).toBe('1994');
  }

  async Then_validate_the_registration_completed(): Promise<void> {
    await this.registroElements.getButtomRegister().click();
    await expect(
      this.registroElements.getMsgRegistrationCompleted()
    ).toBeVisible();
    await this.registroElements.getButtomContinue().click();
  }
}
