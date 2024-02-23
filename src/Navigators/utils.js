/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { Linking } from 'react-native'
import { useNavigationState } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export const navigateAndSimpleReset = (name, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export const usePreviousRouteName = () => {
  return useNavigationState(state =>
    state.routes[state.index - 1]?.name
      ? state.routes[state.index - 1].name
      : 'None',
  )
}

export const linking = {
  prefixes: ['prestisa://', 'https://prestisacustomer.page.link'],
  async getInitialURL() {
    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL()

    return url
  },

  config: {
    initialRouteName: 'Main',
    screens: {
      ResetPassword: {
        path: 'resetpassword',
      },
      ErrorPayment: {
        path: 'payment-error',
      },
      SuccessPayment: {
        path: 'payment-success',
      },
    },
  },
}
