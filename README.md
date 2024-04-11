# desafioQualityMap
Frontend and Backend automation project using Playwright

## Getting Started

### Prerequisites
1. Install [Node JS](https://nodejs.org/) (version >= 20.x)

### Installation
1. Run the command `npm i --save-dev` to install all project dependencies.
2. Execute `npx playwright install` to install the browsers required by Playwright.

### Running Tests
1. Execute `npm run ci` to run the entire test suite.
2. Use `npm run show-report` to visualize the generated reports.

All generated artifacts can be found in the `./artifacts` directory. To remove these files, run `npm run clean`.

## Project Structure
The project is organized as follows:

- **Scenarios**: Contains mappings for test scenarios.
- **Support**: Includes project structure files.
  - **Elements**: Maps elements on each screen.
  - **Files**: Other files required for the test.
  - **Fixtures**: Configuration files for test data.
  - **Pages**: Contains logic used to perform actions in tests.

Feel free to reach out if you have any questions or need further assistance with the project. Happy testing!

---

*Copyright (c) 2024 Renan Pacheco*