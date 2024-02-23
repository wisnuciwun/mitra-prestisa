import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import { StatusBar } from 'react-native'
import { ThemeProvider, Button, createTheme } from '@rneui/themed'
import { ToastProvider } from 'react-native-toast-notifications'
import ToastDanger from './Components/Base/ToastDanger'
import ToastSuccess from './Components/Base/ToastSuccess'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { Colors } from '@/Theme/Variables'

const theme = createTheme({
  Button: {
    buttonStyle: {
      height: 48,
      backgroundColor: Colors.primary,
      borderRadius: 5,
    },
    titleStyle: { fontSize: 16, fontWeight: '500' },
  },
  Input: {
    containerStyle: { paddingHorizontal: 0, marginTop: 10 },
    inputStyle: { fontSize: 14, paddingHorizontal: 15 },
    inputContainerStyle: {
      borderWidth: 1,
      borderRadius: 5,
    },
    renderErrorMessage: false,
  },
})

const App = () => (
  <ToastProvider
    renderType={{
      custom_danger: toast => <ToastDanger toast={toast} />,
      custom_success: toast => <ToastSuccess toast={toast} />,
    }}
  >
    <ThemeProvider theme={theme}>
      <FlipperAsyncStorage />
      <Provider store={store}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </ToastProvider>
)

export default App
