import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { addCardToDeck } from '../utils/api'
import { base, colors } from '../styles/base'

export default function AddCardScreen(props) {
    const { id, title } = props.route.params
    const inputRef = useRef();
    const [state, setState] = useState({
        question: '',
        answer: ''
    })


    const handleChange = (text, name) => {
        setState({
            ...state,
            [name]: text
        })
    }

    const addCard = () => {
        addCardToDeck(id, state)
        setState({
            question: '',
            answer: ''
        })
        inputRef.current.focus()
    }

    return (
        <View style={base.container}>
            <View style={base.headerContainer}>
                <Text style={base.headerText}>Add card to <Text style={{ fontWeight: 'bold' }}>{title}</Text> deck</Text>
            </View>

            <Input
                ref={inputRef}
                containerStyle={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Question'
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                onChangeText={text => handleChange(text, 'question')}
                value={state.question}
            />

            <Input
                containerStyle={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Answer'
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                onChangeText={text => handleChange(text, 'answer')}
                value={state.answer}
            />

            <Button
                disabled={!(state.question && state.answer)}
                title='Add Card'
                containerStyle={{ marginTop: 16 }}
                buttonStyle={{ backgroundColor: colors.green }}
                onPress={addCard}
            />
        </View>
    )
}

AddCardScreen.propTypes = {
    route: PropTypes.object
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 24
    }
})
