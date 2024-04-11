import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class RegistroElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getRegister(): Locator {
    return this.page.locator('a.ico-register');
  }

  getGenderMale(): Locator {
    return this.page.locator('#gender-male');
  }

  getFirstName(): Locator {
    return this.page.locator('#FirstName');
  }

  getLastName(): Locator {
    return this.page.locator('#LastName');
  }

  getDay(): Locator {
    return this.page.locator('select[name="DateOfBirthDay"]');
  }

  getMonth(): Locator {
    return this.page.locator('select[name="DateOfBirthMonth"]');
  }

  getYear(): Locator {
    return this.page.locator('select[name="DateOfBirthYear"]');
  }

  getEmail(): Locator {
    return this.page.locator('#Email');
  }
}
