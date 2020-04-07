import {
    _getDecks,
    _getDeck,
    _saveDeckTitle,
    _addCardToDeck,
    _deleteDeck
  } from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getDecks()
  ]).then(([decks]) => ({
    decks
  }))
}

export function getDeck (id) {
  return _getDeck(id)
}

export function getDecks () {
  return _getDecks()
}

export function saveDeckTitle (title, subtitle = '') {
  return _saveDeckTitle(title, subtitle)
}

export function addCardToDeck (id, card) {
  return _addCardToDeck(id, card)
}

export function deleteDeck (id) {
  return _deleteDeck(id)
}