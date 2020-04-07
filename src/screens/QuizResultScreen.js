import React from 'react'
import { StyleSheet, Text, View } from  'react-native'
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

import { base } from '../styles/base'

const QuizResultScreen = (props) => {
    const { id, score } = props.route.params

    clearLocalNotification()
        .then(setLocalNotification)

    return (
        <View style={base.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{Math.round(score)}%</Text>
            </View>
            {score >= 80 ?
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Congratulations!</Text>
                </View>
            :
            null
            }
            <View style={base.buttonGroupContainer}>
                <Button
                    title='Retry'
                    containerStyle={{ marginBottom: 16 }}
                    buttonStyle={base.primaryButton}
                    onPress={() => props.navigation.navigate('Quiz', {
                        id: id
                    })}
                />
                <Button
                    title='Return to Deck'
                    type='outline'
                    buttonStyle={styles.buttonStyle}
                    onPress={() => props.navigation.navigate('Details', {
                        id: id
                    })}
                />
            </View>
        </View>
    )
}

QuizResultScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired
        })
    })
}

const styles = StyleSheet.create({
    scoreContainer: {
        textAlign: 'center',
        marginBottom: 32
    },
    scoreText: {
        fontSize: 64,
        textAlign: 'center'
    },
    messageContainer: {
        marginBottom: 32
    },
    messageText: {
        textAlign: 'center'
    }
})

export default QuizResultScreen
