import { injectTokensToLocalStorage } from "../custom-actions"

const btnLogout = '[data-cy="btn-logout"]'
const linkUser = '[data-cy="link-user"]'
const linkEditProfile = '[data-cy="link-edit-profile"]'
const btnKakaoLogin ="[data-cy=btn-kakaologin]"


describe('logout test', () => {
  it('should login success', ()=>{
    injectTokensToLocalStorage()

    cy.visit("/")
    cy.get(linkUser).should('exist')
  })
  it('should move to profile edit page', ()=>{
    injectTokensToLocalStorage()

    cy.visit("/")
    cy.get(linkUser).click()
    cy.get(linkEditProfile).should('exist').click()
  })
  it('should logout successfully', ()=>{
    injectTokensToLocalStorage()

    cy.visit("/")
    cy.get(linkUser).click()
    cy.get(linkEditProfile).click()
    cy.get(btnLogout).should('exist').click()
    cy.get(btnKakaoLogin).should('exist')
  })
})