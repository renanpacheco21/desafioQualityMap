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
    await this.registroElements.getFirstName().fill(faker.name.firstName());
    await this.registroElements.getLastName().fill(faker.name.lastName());
    await this.registroElements.getDay().type('10');
    await this.registroElements.getMonth().type('April');
    await this.registroElements.getYear().type('1994');
    await this.registroElements.getEmail().fill(faker.internet.email());
    await this.registroElements.getCompanyName().fill(faker.name.jobArea());
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

  async When_typing_incomplete_email(): Promise<void> {
    await this.registroElements.getEmail().fill('teste123');
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

  async And_enter_incomplete_email(): Promise<void> {
    await this.registroElements.getEmail().fill('teste@r');
    await this.When_confirm_the_registration();
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
    const passwordIncorrectErrorElement =
      await this.registroElements.getPasswordRequiredError();
    expect(await passwordIncorrectErrorElement.isVisible()).toBe(true);
    expect(await passwordIncorrectErrorElement.innerText()).toEqual(
      `Password must meet the following rules:

must have at least 6 characters`
    );
  }

  async Then_validate_password_confirmation(): Promise<void> {
    const confirmPasswordIncorrectErrorElement =
      await this.registroElements.getConfirmPasswordRequiredError();
    expect(await confirmPasswordIncorrectErrorElement.isVisible()).toBe(true);
    expect(await confirmPasswordIncorrectErrorElement.innerText()).toEqual(
      'The password and confirmation password do not match.'
    );
  }

  async Then_validate_the_incorrect_email(): Promise<void> {
    const emailIncorrectErrorElement =
      await this.registroElements.getEmailRequiredError();
    expect(await emailIncorrectErrorElement.isVisible()).toBe(true);
    expect(await emailIncorrectErrorElement.innerText()).toEqual('Wrong email');
  }

  async Then_validate_the_incorrect_email_in_the_complete_registration(): Promise<void> {
    const emailRequiredErrorTopElement =
      await this.registroElements.getGeneralErrorEmail();
    expect(await emailRequiredErrorTopElement.isVisible()).toBe(true);
    expect(await emailRequiredErrorTopElement.innerText()).toEqual(
      'Wrong email'
    );
  }
}
