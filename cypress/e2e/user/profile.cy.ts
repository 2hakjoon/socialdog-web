import { injectTokensToLocalStorage } from "../custom-actions"

const linkUser = '[data-cy="link-user"]'
const linkEditProfile = '[data-cy="link-edit-profile"]'
const btnBlockRejectModal = '[data-cy="btn-block-reject-modal"]'
const btnCancelSubscribe = '[data-cy="btn-cancel-subscribe"]'
const btnRequestSubscribe = '[data-cy="btn-cancel-subscribe"]'
const btnUnblock ='[data-cy="btn-unblock"]'
const btnBlock ='[data-cy="btn-block"]'
const textUsername = '[data-cy="text-username"]'


const testAccount='테스트계정1'


describe('myprofile',()=>{
  beforeEach(()=>{
    injectTokensToLocalStorage();
    cy.visit('/');
    cy.get(linkUser).should('not.have.attr','href','/').click();
  })
  afterEach(()=>{
    cy.clearLocalStorage();
  })

  it('should render profile edit button only on my profile', ()=>{
    cy.get(textUsername).should('exist')
    cy.get(linkEditProfile).should('exist')
    cy.visit(`/${encodeURIComponent(testAccount)}`)
    cy.get(textUsername).should('exist').should('have.text', testAccount)
    cy.get(linkEditProfile).should('not.exist')
  })

  it('should render reject and block button on my profile', ()=>{
    cy.get(btnBlockRejectModal).should('exist')
    cy.get(btnCancelSubscribe).should('not.exist')
    cy.get(btnRequestSubscribe).should('not.exist')
    cy.get(btnUnblock).should('not.exist')
    cy.get(btnBlock).should('not.exist')
  })
})