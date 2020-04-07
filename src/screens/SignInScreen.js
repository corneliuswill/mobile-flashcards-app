import React from 'react'
import { StyleSheet, Text, View } from  'react-native'
import { Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

const SignInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Input
                    containerStyle={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='Email'
                    placeholderTextColor="#CCC"
                    autoCapitalize="none"
                    //onChangeText={text => setQuestion(text)}
                    //value={question}
                />

                <Input
                    containerStyle={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='Password'
                    placeholderTextColor="#CCC"
                    autoCapitalize="none"
                    //onChangeText={text => setQuestion(text)}
                    ///value={question}
                />

                <View style={styles.buttonContainer}>
                <Button
                    title='Sign In'
                    containerStyle={{ marginTop: 16 }}
                    buttonStyle={styles.addButton}
                    //onPress={addCard}
                />
                </View>

                <Text
                    style={styles.helpText}
                    onPress={() => navigation.navigate('Reset Password')}
                >
                Forgot Password?
                </Text>
            </View>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

SignInScreen.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        margin: 16
    },
    input: {
        marginBottom: 16
    },
    buttonContainer: {
        marginBottom: 8
    },
    helpText: {
        textAlign: 'center'
    }
})

export default SignInScreen
