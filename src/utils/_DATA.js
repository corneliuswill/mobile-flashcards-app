import { AsyncStorage } from 'react-native'
import { getRandomNumber} from './utils'
import { ELEMENTS } from '../datasets/elements'
import { STATES } from '../datasets/states'

export const FLASHCARDS_STORAGE_KEY = '@MobileFlashcards:flashcards'

let decks = {
    "kzutm5xy58jm6rgn9s51zs": {
        id: 'kzutm5xy58jm6rgn9s51zs',
        title: 'React',
        timestamp: 1583966791601,
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            },
            {
                question: 'Hooks',
                answer: 'Let you use state and other React features without writing a class'
            },
            {
                question: 'First release to support Hooks',
                answer: '16.8.0'
            }
        ]
    },
    "ihq7i5ajy5cjxfjiq0qg": {
        id: 'ihq7i5ajy5cjxfjiq0qg',
        title: 'React Native',
        timestamp: 1583966805565,
        questions: []
    },
    "qwsx3urssebwlaufhwpyj": {
        id: 'qwsx3urssebwlaufhwpyj',
        title: 'JavaScript',
        timestamp: 1583966820202,
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            },
            {
                question: 'Represents the eventual completion (or failure) of an asynchronous operation, and its resulting value',
                answer: 'Promise'
            },
            {
                question: 'A variable has been declared, but has not been assigned a value, is automatically assigned the value',
                answer: 'undefined'
            },
            {
                question: 'Hoisting',
                answer: 'Variables and function declarations are moved to the top of their scope before code execution'
            },
            {
                question: 'map()',
                answer: 'creates a new array populated with the results of calling a provided function on every element in the calling array'
            },
            {
                question: 'reduce()',
                answer: 'reduces the array to a single value'
            },
            {
                question: 'async',
                answer: 'declaration defines an asynchronous function'
            },
            {
                question: 'await',
                answer: 'operator used to wait for a Promise'
            }                                                   
        ]
    },
    "5coj6hopzyqihqnh7qt8ss": {
        id: '5coj6hopzyqihqnh7qt8ss',
        title: 'Java',
        timestamp: 1584318640985,
        questions: []
    },
    "nq4482j2n68ol8ox64nm2": {
        id: 'nq4482j2n68ol8ox64nm2',
        title: 'Math',
        subtitle: 'Multiplication',
        timestamp: 1584318885714,
        questions: generateMultiplicationData(20)
    },
    "dnjw0rgo2omuzwm77qxdkl": {
        id: 'dnjw0rgo2omuzwm77qxdkl',
        title: 'Math',
        subtitle: 'Addition',
        timestamp: 1585639678323,
        questions: generateAdditionData()
    },
    "pydwr9f4kxlsoyeh55ci8": {
        id: 'pydwr9f4kxlsoyeh55ci8',
        title: 'Math',
        subtitle: 'Subtraction',
        timestamp: 1585639690978,
        questions: generateSubtractionData()
    },
    "3pirbcg5pjudrk7zoh6r": {
        id: '3pirbcg5pjudrk7zoh6r',
        title: 'Periodic Table',
        subtitle: '',
        timestamp: 1585886487221,
        questions: getElementsData()
    },
    "7fy1hbfttjr04b3b147ds": {
        id: '7fy1hbfttjr04b3b147ds',
        title: 'US State Capitals',
        subtitle: '',
        timestamp: 1585938877514,
        questions: getStateData() 
    }
}

export async function setDummyData () {
    try {
        await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
        const response = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY) || '{}'

        return JSON.parse(response)
    } catch (error) {
        console.log('Error', 'Error saving data')
    }
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


function generateMultiplicationData (totalCards = 10, max = 10) {
    let data = []

    for (let cnt = 0; cnt < totalCards; cnt++) {
        let leftOperand = getRandomNumber(max)
        let rightOperand = getRandomNumber(max)

        let question = `${leftOperand} * ${rightOperand}`
        let answer = leftOperand * rightOperand

        let card = {
            question,
            answer
        }

        data.push(card)
    }

    return data
}

function generateAdditionData (totalCards = 10, max = 10) {
    let data = []

    for (let cnt = 0; cnt < totalCards; cnt++) {
        let leftOperand = getRandomNumber(max)
        let rightOperand = getRandomNumber(max)

        let question = `${leftOperand} + ${rightOperand}`
        let answer = leftOperand + rightOperand

        let card = {
            question,
            answer
        }

        data.push(card)
    }

    return data
}

function generateSubtractionData (totalCards = 10, max = 10) {
    let data = []

    for (let cnt = 0; cnt < totalCards; cnt++) {
        let leftOperand = getRandomNumber(max)
        let rightOperand = getRandomNumber(max)

        let question = `${leftOperand} - ${rightOperand}`
        let answer = leftOperand - rightOperand

        let card = {
            question,
            answer
        }

        data.push(card)
    }

    return data
}

function getElementsData () {
    let data = ELEMENTS.map(el => {
        return {
            question: el.name,
            answer: el.symbol
        }
    })

    return data
}

function getStateData () {
    let data = STATES.map(el => {
        return {
            question: el.state,
            answer: el.city
        }
    })

    return data
}

function formatDeck (title, subtitle) {
    return {
        id: generateUID(),
        title,
        subtitle,
        timestamp: Date.now(),
        questions: []
    }
}

export async function _getDecks () {
    try {
        const response =  await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY) || '{}'
        const decks = JSON.parse(response)

        return decks
    } catch (error) {
       console.log('Error: ', error.message)
    }
}

export async function _getDeck (id) {
    try {
        const response = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY) || '{}'
        const decks = JSON.parse(response)

        return decks[id]
    } catch (error) {
       console.log('Error: ', error.message)
    }
}

export async function _saveDeckTitle (title, subtitle) {
    const formattedDeck = formatDeck(title, subtitle)

    try {
        let decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY) || '{}'
        decks = JSON.parse(decks)
        decks[formattedDeck.id] = formattedDeck

        await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))

        return formattedDeck.id
     } catch (error){
         console.log('Error: ', error.message)
     }
}

export async function _addCardToDeck (id, card)  {
    try {
       let decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY) || '{}'
       decks = JSON.parse(decks)
       decks[id].questions.push(card)

       return await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    } catch (error){
        console.log('Error: ', error.message)
    }
}

export async function _deleteDeck (id) {
    try {
        // TODO: Feature: delete deck
    } catch (error){
        console.log('Error: ', error.message)
    }
}
