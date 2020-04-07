import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from  'react-native'
import PropTypes from 'prop-types'

const FlashCard = ({ question, answer }) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const flipAnim = useRef(new Animated.Value(0)).current
    let defaultValue = 0

    let frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    })

    let backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    })

    const frontAnimatedStyle = {
        transform: [
            {
                rotateY: frontInterpolate
            }
        ]
    }

    const backAnimatedStyle = {
        transform: [
            {
                rotateY: backInterpolate
            }
        ]
    }

    useEffect(() => {
        flipAnim.addListener(({ value }) => {
            defaultValue = value
        })
    })

    const flipCard = () => {
        if (defaultValue >= 90) {
            Animated.timing(flipAnim, {
                toValue: 0,
                duration: 800
            }).start()
        } else {
            Animated.timing(flipAnim, {
                toValue: 180,
                duration: 800
            }).start()
        }

        console.log('flipCard', defaultValue)
    }

    return (
        <View>
            <View style={[styles.contentContainer]}>
                <Animated.View style={[{ width: screenWidth - 32, height: screenHeight - 352 }, styles.flipCard, frontAnimatedStyle]}>
                    <Text style={styles.content}>{question}</Text>
                </Animated.View>
                <Animated.View style={[{ width: screenWidth - 32, height: screenHeight - 352 }, backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                    <Text style={styles.content}>{answer}</Text>
                </Animated.View>
            </View>
            <View>
                <TouchableOpacity onPress={() => flipCard()}>
                    <Text style={styles.flipCardText}>FLIP CARD</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

FlashCard.propTypes = {
    question: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    answer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius:16,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center'
    },
    contentContainer: {
        marginBottom: 16
    },
    content: {
        fontSize: 32,
        textAlign: 'center'
    },
    flipCard: {
        backgroundColor: '#FFF',
        borderRadius:16,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        position: 'absolute',
        top: 0
    },
    flipCardText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#77BBC7'
    }
})

export default FlashCard
