

const imgSplash ="[data-cy=img-splash]"
const btnKakaoLogin ="[data-cy=btn-kakaologin]"
const userProfileLink = "[data-cy=link-user]"

describe('show login page', () => {
  it('should visit to home', () => {
    cy.visit('/')
  })

  it('should display items', () => {
    cy.visit('/')

    cy.get(imgSplash)
    cy.get(btnKakaoLogin)
  })

  it('should login', () => {
    cy.visit('/')

    cy.get(btnKakaoLogin).click()
    cy.get(userProfileLink)
  })
})