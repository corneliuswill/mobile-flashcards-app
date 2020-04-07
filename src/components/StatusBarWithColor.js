import React from 'react'
import { StyleSheet, StatusBar, View, Platform } from  'react-native'
import PropTypes from 'prop-types'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const StatusBarWithColor = ({ backgroundColor, ...props }) => {
    return (
        <View style={[styles.statusBar, {backgroundColor}]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

StatusBarWithColor.propTypes = {
    backgroundColor: PropTypes.string
}

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
})

export default StatusBarWithColor
