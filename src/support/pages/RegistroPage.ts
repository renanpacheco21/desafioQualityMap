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

  async When_confirm_the_registration(): Promise<void> {
    await this.registroElements.getButtomRegister().click();
  }

  async When_you_enter_an_incomplete_password(): Promise<void> {
    await this.registroElements.getPassword().fill('12345');
    await this.When_confirm_the_registration();
  }

  async When_entering_the_password_and_confirmation(): Promise<void> {
    await this.registroElements.getPassword().fill('123456');
    await this.registroElements.getConfirmPassword().fill('12345');
    await this.When_confirm_the_registration();
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
    await this.When_confirm_the_registration();
    await expect(
      this.registroElements.getMsgRegistrationCompleted()
    ).toBeVisible();
    await this.registroElements.getButtomContinue().click();
  }

  async Then_validate_all_required_fields(): Promise<void> {
    const firstNameErrorElement =
      await this.registroElements.getFirstNameError();
    expect(await firstNameErrorElement.isVisible()).toBe(true);
    expect(await firstNameErrorElement.innerText()).toEqual(
      'First name is required.'
    );
    const lastNameErrorElement = await this.registroElements.getLastNameError();
    expect(await lastNameErrorElement.isVisible()).toBe(true);
    expect(await lastNameErrorElement.innerText()).toEqual(
      'Last name is required.'
    );
    const emailRequiredErrorElement =
      await this.registroElements.getEmailRequiredError();
    expect(await emailRequiredErrorElement.isVisible()).toBe(true);
    expect(await emailRequiredErrorElement.innerText()).toEqual(
      'Email is required.'
    );
    const passwordRequiredErrorElement =
      await this.registroElements.getPasswordRequiredError();
    expect(await passwordRequiredErrorElement.isVisible()).toBe(true);
    expect(await passwordRequiredErrorElement.innerText()).toEqual(
      'Password is required.'
    );
    const confirmPasswordRequiredErrorElement =
      await this.registroElements.getConfirmPasswordRequiredError();
    expect(await confirmPasswordRequiredErrorElement.isVisible()).toBe(true);
    expect(await confirmPasswordRequiredErrorElement.innerText()).toEqual(
      'Password is required.'
    );
  }

  async Then_validate_the_password_character_rule(): Promise<void> {
    const passwordRequiredErrorElement =
      await this.registroElements.getPasswordRequiredError();
    expect(await passwordRequiredErrorElement.isVisible()).toBe(true);
    expect(await passwordRequiredErrorElement.innerText()).toEqual(
      `Password must meet the following rules:

must have at least 6 characters`
    );
  }

  async Then_validate_password_confirmation(): Promise<void> {
    const passwordRequiredErrorElement =
      await this.registroElements.getConfirmPasswordRequiredError();
    expect(await passwordRequiredErrorElement.isVisible()).toBe(true);
    expect(await passwordRequiredErrorElement.innerText()).toEqual(
      'The password and confirmation password do not match.'
    );
  }
}
