import { hasOperationName } from "../utils/graphql-test-utils";

describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (hasOperationName(req, 'event')) {
        req.alias = 'queryEvent'
        req.reply({
          fixture: '../fixtures/event.json'
        })
      }

      if (hasOperationName(req, 'user')) {
        req.alias = 'queryUser'
        req.reply({
          fixture: '../fixtures/user.json'
        })
      }
    })
    cy.visit('http://www.birds-of-a-feather.net/new-event')
  });

  it('User sees a map on page load', () => {
    cy.get('#map')
  })

  it('Can type into the form', () => {
    cy.get('input').eq(0).click().type('Trip to Zoo')
    cy.get('input').eq(1).click()
    cy.get('input').eq(2).click().type('The Zoo')
    cy.get('input').eq(3).click().type('We want to go to the zoo with you!')
    cy.get('input').eq(0).click().should('have.value', 'Trip to Zoo')
    cy.get('input').eq(3).click().should('have.value','We want to go to the zoo with you!')
  })

  it('When the user types into the location bar suggestions should populate', () => {
    cy.get('input').eq(2).click().type('The Zoo, CO')
    cy.get('option').eq(0).click()
    cy.get('input').eq(2).should('have.value', 'The Zoo Crew, 5721 Main St, Odessa, ON')
  })

  it('When a user selects a location from the suggestions the suggestion box should dissapear', () => {
    cy.get('input').eq(2).click().type('The Zoo, Boulder')
    cy.get('option').eq(0).click()
    cy.get('input').eq(2).should('have.value', 'The Zoo, 1531 Broadway St, Boulder, CO')
    cy.get('option').should('not.exist')
  })
  it('When a user selects a location a map with a marker should populate', () => {
    cy.visit('https://example.cypress.io')
  })
  it.only('When a user submits the form a confirmation should pop up and the fields should reset', () => {
    cy.get('input').eq(0).click().type('Trip to Zoo')
    cy.get('input').eq(1).click()
    cy.get('input').eq(2).click().type('The Zoo, Boulder CO')
    cy.get('option').eq(0).click()
    cy.get('input').eq(3).click().type('We want to go to the zoo with you!')
    cy.get('input').eq(0).click().should('have.value', 'Trip to Zoo')
    cy.get('input').eq(3).click().should('have.value','We want to go to the zoo with you!')
    cy.get('button').eq(3).click()
    cy.intercept('POST', '/graphql', (req) => {
      if (hasOperationName(req, 'event')) {
        req.alias = 'mutationEvent'
        req.reply({
          fixture: '../fixtures/event.json'
        })
      }
    })
    cy.get('alert')
})
  it('User should be able to navigate back to dashboard from event form', () => {
    cy.visit('https://example.cypress.io')
  })
  it('User should be able to navigate to user profile from event form', () => {
    cy.visit('https://example.cypress.io')
  })
  it('User should see new event on profile after they submitted event', () => {
    cy.visit('https://example.cypress.io')
  })
})
