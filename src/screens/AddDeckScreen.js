import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import PropTypes from 'prop-types'
import { Input, Button } from 'react-native-elements';

import { saveDeckTitle } from  '../utils/api'
import { base, colors } from '../styles/base'

export default function AddDeckScreen(props) {
    const [ state, setState ] = useState({
        title: '',
        subtitle: ''
    })

    const handleChange = (text, name) => {
        setState({
            ...state,
            [name]: text
        })
    }

    const handleAddDeck = () => {
        saveDeckTitle(state.title, state.subtitle).then((id) => {
            setState({
                title: '',
                subtitle: ''
            })
            props.navigation.navigate('Details', {
                id: id
            })
        })
    }

    return (
        <View style={base.container}>
            <View style={base.headerContainer}>
                <Text style={base.headerText}>
                    What is the title of your new Deck?
                </Text>
            </View>

            <Input
                containerStyle={styles.input}
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Title'
                placeholderTextColor = "#CCC"
                autoCapitalize="none"
                onChangeText={text => handleChange(text, 'title')}
                value={state.title}
            />

            <Input
                containerStyle={styles.input}
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Subtitle (optional)'
                placeholderTextColor = "#CCC"
                autoCapitalize="none"
                onChangeText={text => handleChange(text, 'subtitle')}
                value={state.subtitle}
            />

            <Button
                disabled={!(state.title)}
                title='Create Deck'
                buttonStyle={{backgroundColor: colors.green}}
                onPress={handleAddDeck}
            />

        </View>
    )
}

AddDeckScreen.propTypes = {
    navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 24
    }
})
