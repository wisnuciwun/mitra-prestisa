import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  AccountContainer,
  HomeContainer,
  UnderConstructionContainer,
  TransactionContainer,
} from '@/Containers'
import { Image, Text } from '@rneui/base'
import { useTheme } from '@/Hooks'
import { Colors, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import IconSoon from '@/Components/Base/IconSoon'
import IconTransaction from '@/Components/Base/IconTransaction'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Images } = useTheme()

  const _FeatherIcon = ({ name, focused }) => (
    <FeatherIcon
      name={name}
      size={20}
      color={focused ? Colors.primary : Colors.neutralGray02}
    />
  )

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <_FeatherIcon name={`home`} focused={focused} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : Colors.neutralBlack02,
                fontFamily: Fonts.medium,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Feeds"
        component={UnderConstructionContainer}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.push('UnderConstruction')
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => <IconSoon />,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.neutralBlack02 : Colors.neutralBlack02,
                fontFamily: Fonts.medium,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Feeds
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={TransactionContainer}
        // listeners={({ navigation }) => ({
        //   tabPress: e => {
        //     e.preventDefault()
        //     // navigation.push('UnderConstruction')
        //   },
        // })}
        options={{
          tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
          headerStyle: { borderBottomColor: '#eee', borderBottomWidth: 1 },
          tabBarIcon: ({ focused }) => (
            <IconTransaction
              color={focused ? Colors.primary : Colors.neutralGray02}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : Colors.neutralBlack02,
                fontFamily: Fonts.medium,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Transaksi
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <_FeatherIcon name={`user`} focused={focused} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : Colors.neutralBlack02,
                fontFamily: Fonts.medium,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Akun
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
