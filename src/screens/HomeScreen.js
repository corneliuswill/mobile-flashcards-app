import React from 'react'
import { StyleSheet, Text, View } from  'react-native'
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types'

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mobile Flashcards</Text>
            <Button
                onPress={() => props.navigation.navigate('Decks')}
                title='Get Started'
            />
        </View>
    )
}

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        textAlign: 'center'
    }
})


