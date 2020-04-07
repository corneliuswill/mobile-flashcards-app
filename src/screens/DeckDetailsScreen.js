import React, { useEffect, useState }from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types'
import { getDeck } from '../utils/api';
import { base, colors } from '../styles/base'

export default function DeckDetailsScreen(props) {
    const { id } = props.route.params
    const [deck, setDeck] = useState({
        id: '',
        title: '',
        subTitle: '',
        questions: []
    })

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getDeck(id).then((data) => {
                setDeck(data)
            })
        });

        return unsubscribe
    },[props.navigation])

    return (
        <View style={base.container}>
            <View style={styles.deckTitleContainer}>
                <Text style={styles.title}>{deck.title}</Text>
                {deck.subtitle !== '' && <Text style={styles.subTitle}>{deck.subtitle}</Text>}
            </View>
            <View style={styles.totalCardContainer}>
                <Text style={styles.totalCards}>{deck.questions ? deck.questions.length : null} cards</Text>
            </View>
            <View style={base.buttonGroupContainer}>
                <Button
                    title='Start Quiz'
                    buttonStyle={{ backgroundColor: colors.green }}
                    containerStyle={{ marginBottom: 16 }}
                    onPress={() => props.navigation.navigate('Quiz', {
                        id: deck.id
                    })}
                />
                <Button
                    title='Add Card'
                    type='outline'
                    //buttonStyle={base.secondaryButtonHollow}
                    onPress={() => props.navigation.navigate('Add Card', {
                        id: deck.id,
                        title: deck.title
                    })}
                />
                {/* TODO: Feature: delete deck
                <Text
                    style={styles.deleteText}
                    onPress={() => alert('Delete Deck?')}
                >
                Delete Deck
                </Text>
                */}
            </View>
        </View>
    )
}

DeckDetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object
}

const styles = StyleSheet.create({
    deckTitleContainer: {
        marginBottom: 16
    },
    totalCardContainer: {
        marginBottom: 32
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center'
    },
    subTitle: {
        color: '#999',
        textAlign: 'center'
    },
    totalCards: {
        fontSize: 32,
        textAlign: 'center'
    },
    deleteText: {
        marginTop: 16,
        textAlign: 'center'
    }
})

