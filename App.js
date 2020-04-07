import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

//import HomeScreen from './src/screens/HomeScreen'
import DeckListScreen from './src/screens/DeckListScreen'
import DeckDetailsScreen from './src/screens/DeckDetailsScreen'
import AddCardScreen from './src/screens/AddCardScreen'
import QuizScreen from './src/screens/QuizScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import AddDeckScreen from './src/screens/AddDeckScreen'
import MyQuizzesScreen from './src/screens/MyQuizzessScreen'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import QuizResultScreen from './src/screens/QuizResultScreen'
import AlertsScreen from './src/screens/AlertsScreen'

import { setDummyData } from './src/utils/_DATA'
import { setLocalNotification } from './src/utils/helpers'

const Tab = createBottomTabNavigator()
const DeckStack = createStackNavigator()
const AddDeckStack = createStackNavigator()
const LogInStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const MyQuizzesStack = createStackNavigator()
const AlertsStack = createStackNavigator()

function DeckStackScreen({ navigation, route}) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  return (
    <DeckStack.Navigator
      initialRouteName='Deck'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F416E'
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      {/*<DeckStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />*/}
      <DeckStack.Screen name='My Decks' component={DeckListScreen} />
      <DeckStack.Screen name='Details' component={DeckDetailsScreen} />
      <DeckStack.Screen name='Add Card' component={AddCardScreen} />
      <DeckStack.Screen name='Quiz' component={QuizScreen} />
      <DeckStack.Screen name='Quiz Result' component={QuizResultScreen} />
      <AddDeckStack.Screen name='Add Deck' component={AddDeckScreen} />
    </DeckStack.Navigator>
  )
}

DeckStackScreen.propTypes = {
  navigation: PropTypes.shape({
      setOptions: PropTypes.func
  }),
  route: PropTypes.shape({
    state: PropTypes.object
  })
}

function LogInStackScreen() {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen name='Sign In' component={SignInScreen} />
      <LogInStack.Screen name='Sign Up' component={SignUpScreen} />
      <LogInStack.Screen name='Reset Password' component={ResetPasswordScreen} />
    </LogInStack.Navigator>
  )
}

function MyQuizzesStackScreen() {
  return (
    <MyQuizzesStack.Navigator>
      <MyQuizzesStack.Screen name='Quizzes' component={MyQuizzesScreen} />
    </MyQuizzesStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='Profile' component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}

function AlertsStackScreen() {
  return (
    <AlertsStack.Navigator>
      <AlertsStack.Screen name='Alerts' component={AlertsScreen} />
    </AlertsStack.Navigator>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // TODO: Fetch data
    setDummyData().then((data) => {
      //console.log('Dummy data loaded:', data)
      setLocalNotification()
    })

    setIsLoggedIn(true)
  },[])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ?
        <Tab.Navigator
          initialRouteName='Add Deck'
          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ focused, color, size })  => {
              let iconName

              if (route.name === 'Decks') {
                iconName = focused ? 'cards' : 'cards-outline'
                return <MaterialCommunityIcons name={iconName} color={color} size={size}  />
              } else if (route.name === 'Add Deck') {
                iconName = focused ? 'plus-box' : 'plus-box-outline'
                return <MaterialCommunityIcons name={iconName} color={color} size={size}  />
              } else if (route.name === 'My Quizzes') {
                iconName = focused ? 'comment-question' : 'comment-question-outline'
                return <MaterialCommunityIcons name={iconName} color={color} size={size}  />
              }  else if (route.name === 'Profile') {
                iconName = focused ? 'user' : 'user-o'
                return <FontAwesome name={iconName} color={color} size={size}  />
              } else if (route.name === 'Alerts') {
                iconName = focused ? 'bell' : 'bell-outline'
                return <MaterialCommunityIcons name={iconName} color={color} size={size}  />
              }

              //return <MaterialCommunityIcons name={iconName} color={color} size={size}  />
            },
          })}
          tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name='Decks'
            component={DeckStackScreen}
            options={{
              tabBarLabel: 'Decks'
            }}
          />
          <Tab.Screen
            name='My Quizzes'
            component={MyQuizzesStackScreen}
            options={{
              tabBarLabel: 'Quizzes',
            }}
          />
          <Tab.Screen
            name='Alerts'
            component={AlertsStackScreen}
            options={{
              tabBarLabel: 'Alerts',
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
            }}
          />
        </Tab.Navigator>
        :
        <LogInStackScreen/>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
