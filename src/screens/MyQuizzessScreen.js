import React from 'react'
import { StyleSheet, Text, View } from  'react-native'

const MyQuizzesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Quizzes Taken</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16
    }
})

export default MyQuizzesScreen
