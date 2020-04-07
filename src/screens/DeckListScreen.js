import React, { useState, useEffect } from 'react'
import {
    FlatList,
    StyleSheet,
    StatusBar,
    Platform,
    View
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import SafeAreaView from 'react-native-safe-area-view';
import { getDecks } from '../utils/api'

export default function DeckListScreen(props) {
    const [selected] = useState(new Map())
    const [decks, setDecks] = useState({})

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getDecks().then((data) => {
                setDecks(data)
            })
        });

        return unsubscribe
    },[props.navigation])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#FFF' }]}>
            <StatusBar barStyle='light-content'/>
            <View style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={({ item }) => (
                        <ListItem
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            subtitleStyle={{ color: '#999', fontSize: 12 }}
                            onPress={() => props.navigation.navigate('Details', {
                                id: item.id,
                                title: item.title
                            })}
                            bottomDivider
                            chevron
                            badge={{
                                value: item.questions.length,
                                textStyle: { color: '#FFF' }
                            }}
                        />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
                />
                <Fab
                    style={{ backgroundColor: '#775D9E' }}
                    onPress={() => props.navigation.navigate('Add Deck')}
                >
                <Icon name='add' />
                </Fab>
            </View>
        </SafeAreaView>
    )
}

DeckListScreen.propTypes = {
    navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listTextStyle: {
        marginVertical: 50
    },
    item: {
        padding: 20,
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    totalCards: {
        textAlign: 'center'
    },
    space: {
        height: 32,
    }
})
