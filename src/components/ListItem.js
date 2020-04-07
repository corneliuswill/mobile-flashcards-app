import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

function ListItem({ id, name, totalCards, selected, onSelect, navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', {
                    deckId: id
                })} //onSelect(id)}
                style={[
                    styles.item,
                    { backgroundColor: selected ? '#CCC' : '#FFF' }
                ]}
            >
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.totalCards}>{totalCards}</Text>
            </TouchableOpacity>
        </View>
    )
}

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalCards: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    listTextStyle: {
        marginVertical: 50
    },
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        fontSize: 18,
    },
    name: {
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

export default ListItem
