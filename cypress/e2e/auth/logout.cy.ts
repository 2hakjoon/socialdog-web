import { injectTokensToLocalStorage } from "../custom-actions"

const btnLogout = '[data-cy="btn-logout"]'
const linkUser = '[data-cy="link-user"]'
const linkEditProfile = '[data-cy="link-edit-profile"]'
const btnKakaoLogin ="[data-cy=btn-kakaologin]"


describe('logout test', () => {

  beforeEach(()=>{
    injectTokensToLocalStorage();
    cy.visit("/")
  })
  
  afterEach(()=>{
    cy.clearLocalStorage();
  })

  it('should login success', ()=>{
    
    cy.get(linkUser).should('exist')
  })
  it('should move to profile edit page', ()=>{

    cy.get(linkUser).click()
    cy.get(linkEditProfile).should('exist').click()
  })
  it('should logout successfully', ()=>{

    cy.get(linkUser).click()
    cy.get(linkEditProfile).click()
    cy.get(btnLogout).should('exist').click()
    cy.get(btnKakaoLogin).should('exist')
  })
})