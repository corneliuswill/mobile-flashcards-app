import React from 'react'
import { StatusBar, StyleSheet, Text, View } from  'react-native'
import SafeAreaView from 'react-native-safe-area-view';

const AlertsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <StatusBar/>
            </View>
            <Text>Alerts</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16
    }
})

export default AlertsScreen
