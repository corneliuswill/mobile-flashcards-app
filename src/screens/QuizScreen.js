import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from "react-native-elements"
import SafeAreaView from 'react-native-safe-area-view';

import FlashCard from '../components/FlashCard'
import { base } from '../styles/base'

import { getDeck } from '../utils/api';

const QuizScreen = (props) => {
    const { id } = props.route.params || ''
    const [ deck, setDeck ] = useState({
        id: '',
        title: '',
        subtitle: '',
        questions: []
    })
    const [ index, setIndex ] = useState(0)
    const [ correct, setCorrect ] = useState(0)
    const [ incorrect, setIncorrect ] = useState(0)
    const [ timer, setTimer ] = useState(30)
    const [ answers, setAnswers] = useState([])
    let completed = false;

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
           await getDeck(id).then((data) => {
                if (data.questions.length > 0) {
                    setDeck(data)
                    setIndex(0)
                    setCorrect(0)
                    setIncorrect(0)
                    setTimer(30)
                }
            })
        })

        return unsubscribe
    }, [props.navigation])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 0) {
                setTimer(timer => timer - 1)
            } else {
                clearTimeout(timeout)
            }
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [timer])

    useEffect(() => {
        const totalAnswered = correct + incorrect

        if (totalAnswered !== 0 && totalAnswered === deck.questions.length) {
                props.navigation.navigate('Quiz Result', {
                    id: deck.id,
                    score: getScore()
                })
        }
    },[correct, incorrect])

    const getNextCard = () => {
        if (index < deck.questions.length - 1) {
            setIndex(index + 1)
        }
    }

    const getScore = () => {
        return correct/deck.questions.length * 100
    }

    return (
        <View style={styles.container}>
        {deck.questions.length > 0 ?
        <View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardCount}>{index + 1}/{deck.questions.length}</Text>
                <Text style={timer <= 10 ? styles.timerColor : null}>{timer}</Text>
            </View>
            <FlashCard
                question={deck.questions[index].question}
                answer={deck.questions[index].answer}
            />
            <View style={base.buttonGroupContainer}>
                <Button
                    title='Correct'
                    containerStyle={{ marginBottom: 16 }}
                    buttonStyle={base.primaryButton}
                    onPress={() => {
                        setCorrect(correct + 1)
                        setAnswers(prevAnswers => [...prevAnswers, {
                            cardId: index + 1,
                            answer: 'Y'
                        }])
                        getNextCard()
                    }}
                />
                <Button
                    title='Incorrect'
                    buttonStyle={base.secondaryButton}
                    onPress={() => {
                        setIncorrect(incorrect + 1)
                        setAnswers(prevAnswers => [...prevAnswers, {
                            cardId: index + 1,
                            answer: 'N'
                        }])
                        getNextCard()
                    }}
                />
            </View>
        </View>
        :
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Sorry, you cannot take a quiz, because there are no cards in the deck.</Text>
        </View>
        }
        </View>
    )
}

QuizScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    cardInfo: {
        flexDirection: 'row',
        marginBottom: 16
    },
    cardCount: {
        flexGrow: 1,
        fontSize: 24,
        fontWeight: 'bold'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center'
    },
    timerColor: {
        color: '#F00'
    }
})

export default QuizScreen
