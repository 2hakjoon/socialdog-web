

export const injectTokensToLocalStorage = () => {
  localStorage.setItem("USER_ACCESS_TOKEN",`${Cypress.env('USER_ACCESS_TOKEN')}`)
  localStorage.setItem("USER_REFRESH_TOKEN",`${Cypress.env('USER_REFRESH_TOKEN')}`)
}