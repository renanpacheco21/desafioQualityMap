import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class RegistroElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getBotaoRegister(): Locator {
    return this.page.locator('text=Register');
  }

  // getBotaoPracticeForm(): Locator {
  //   return this.page.locator('text=Practice Form');
  // }

  // getCampoNome(): Locator {
  //   return this.page.locator('#firstName');
  // }

  // getCampoSobrenome(): Locator {
  //   return this.page.locator('#lastName');
  // }

  // getEmail(): Locator {
  //   return this.page.locator('#userEmail');
  // }

  // getGenero(): Locator {
  //   return this.page.locator('#gender-radio-1');
  // }

  // getTelefone(): Locator {
  //   return this.page.locator('#userNumber');
  // }

  // getDataNascimento(): Locator {
  //   return this.page.locator('#dateOfBirthInput');
  // }

  // getMesNascimento(): Locator {
  //   return this.page.locator('select[class=react-datepicker__month-select]');
  // }

  // getAnoNascimento(): Locator {
  //   return this.page.locator('select[class=react-datepicker__year-select]');
  // }

  // getDiaNascimento(): Locator {
  //   return this.page.locator(
  //     '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__month > div:nth-child(3) > div.react-datepicker__day.react-datepicker__day--019'
  //   );
  // }

  // getAssunto(): Locator {
  //   return this.page.locator('#subjectsInput');
  // }

  // getHobbies(): Locator {
  //   return this.page.locator('#hobbies-checkbox-1');
  // }

  // getCampoAnexo(): Locator {
  //   return this.page.locator('#uploadPicture');
  // }

  // getEndereco(): Locator {
  //   return this.page.locator('#currentAddress');
  // }

  // getEstado(): Locator {
  //   return this.page.locator('#state');
  // }

  // getCidade(): Locator {
  //   return this.page.locator('#city');
  // }

  // getBotaoEnviar(): Locator {
  //   return this.page.locator('#submit');
  // }

  // getMensagemCadastroEnviado(): Locator {
  //   return this.page.locator('text=Thanks for submitting the form');
  // }

  // getBotaoFechar(): Locator {
  //   return this.page.locator('#closeLargeModal');
  // }
}
