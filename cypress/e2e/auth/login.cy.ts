

const imgSplash ="[data-cy=img-splash]"
const btnKakaoLogin ="[data-cy=btn-kakaologin]"
const userProfileLink = "[data-cy=link-user]"

describe('show login page', () => {
  it('should visit to home', () => {
    cy.visit('/')
  })

  it('should display items', () => {
    cy.visit('/')

    cy.get(imgSplash).should('exist')
    cy.get(btnKakaoLogin).should('exist')
  })

  it('should login successfully', () => {
    cy.visit('/')

    cy.get(btnKakaoLogin).click()
    cy.get(userProfileLink, { timeout: 1000000 }).should('exist')
  })
})