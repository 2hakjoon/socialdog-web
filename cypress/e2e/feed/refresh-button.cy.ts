import { injectTokensToLocalStorage } from "../custom-actions"


const btnRefresh = '[data-cy="btn-refresh-feed"]'


describe('refresh button test', () => {
  it('should not be rendered when init', () => {
    injectTokensToLocalStorage()
    cy.visit('/')
    cy.get(btnRefresh).should('not.exist')
    cy.clearLocalStorage()
  })

  it('should not be rendered before scrolly<300', () => {
    injectTokensToLocalStorage()
    cy.visit('/')
    cy.scrollTo(0, 300, {duration:1000})
    cy.scrollTo(0, 0, {duration:1000})
    cy.get(btnRefresh).should('not.exist')
    cy.clearLocalStorage()
  })

  it('should be rendered', () => {
    injectTokensToLocalStorage()
    cy.visit('/')
    cy.scrollTo(0, 1000, {duration:1000})
    cy.scrollTo(0, 0, {duration:1000})
    cy.get(btnRefresh).should('exist')
    cy.clearLocalStorage()
  })
})