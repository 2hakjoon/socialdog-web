import { injectTokensToLocalStorage } from "../custom-actions";

const notSubscribingUser = '테스트계정1'
const btnRequestSubscribe = '[data-cy="btn-request-subscribe"]'
const linkUser = '[data-cy="link-user"]'
const btnSubscribingsModal = '[data-cy="btn-subscribings-modal"]'
const btnSubscribersModal = '[data-cy="btn-subscribers-modal"]'
const btnBlockAndReject = '[data-cy="btn-block-reject-modal"]'
const tabSubscribing = "[data-cy='tab-subscribing']"
const tabRequest = "[data-cy='tab-request']"
const tabSubscriber = "[data-cy='tab-subscriber']"
const tabRequested = "[data-cy='tab-requested']"
const wrapperUsercard = '[data-cy="wrapper-usercard"]'
const btnCancleRequest = '[data-cy="btn-cancle-request"]'
const btnHoldRequest = "[data-cy='btn-hold-request']"
const btnAccecptRequest = "[data-cy='btn-accecpt-request']"
const btnRejectRequest = "[data-cy='btn-reject-request']"
const btnCloseModal = '[data-cy="btn-close-modal"]'


describe('subscribe request and cancle',()=>{
  // 초기 데이터 세팅
  // 테스트계정1 은 내가 구독을 신청한 유일한 사용자여야 함.
  // 구독 신청이 아니라 구독중에 있다면, 구독 신청으로 옮겨줘야함.
  beforeEach(()=>{
    injectTokensToLocalStorage();
  })
  afterEach(()=>{
    cy.clearLocalStorage();
  })
  it('request subscribe', ()=> {
    cy.visit(`/${encodeURIComponent(notSubscribingUser)}`)
    cy.get(btnRequestSubscribe).should('exist').click()
  })
  it('cancel subscribe request', ()=>{
    cy.visit('/')
    cy.get(linkUser).should('not.have.attr', 'href', '/').click()
    cy.get(btnSubscribingsModal).should('exist').click()
    cy.get(tabRequest).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
    cy.get(btnCancleRequest).should('exist').click()
    cy.get(wrapperUsercard).should('not.exist')
  })
})

describe('accept request or reject',()=>{
  // 초기 데이터 세팅
  // 테스트계정1 이 나에게 구독을 신청한 유일한 사용자여야 함.
  // 구독 신청이 아니라 구독자 및 거절한 신청 등 다른 케이스에 있다면, 구독 신청으로 옮겨줘야함.
  beforeEach(()=>{
    injectTokensToLocalStorage();

  })
  afterEach(()=>{
    cy.clearLocalStorage();
  })
  it('accept request and hold',()=>{
    cy.visit('/')
    cy.get(linkUser).should('not.have.attr', 'href', '/').click()
    cy.get(btnSubscribersModal).should('exist').click()
    cy.get(tabRequested).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
    cy.get(btnAccecptRequest).should('exist').click()
    cy.get(wrapperUsercard).should('not.exist')
    cy.get(tabSubscriber).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
    cy.get(btnHoldRequest).should('exist').click()
    cy.get(wrapperUsercard).should('not.exist')
    cy.get(tabRequested).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)

  })
  it('accecpt request and reject',()=>{
    cy.visit('/')
    cy.get(linkUser).should('not.have.attr', 'href', '/').click()
    cy.get(btnSubscribersModal).should('exist').click()
    cy.get(tabRequested).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
    cy.get(btnRejectRequest).should('exist').click()
    cy.get(wrapperUsercard).should('not.exist')
    cy.get(btnCloseModal).should('exist').click()
    cy.get(btnBlockAndReject).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
    cy.get(btnAccecptRequest).should('exist').click()
    cy.get(btnCloseModal).should('exist').click()
    cy.get(btnSubscribersModal).should('exist').click()
    cy.get(btnHoldRequest).should('exist').click()
    cy.get(wrapperUsercard).should('not.exist')
    cy.get(tabRequested).should('exist').click()
    cy.get(wrapperUsercard).should('contain.text', notSubscribingUser)
  })
})