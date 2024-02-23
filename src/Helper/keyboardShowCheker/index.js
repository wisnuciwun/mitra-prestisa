import { Keyboard } from 'react-native'
const { useState, useEffect } = require('react')

export const useKeyboardShowChecker = () => {
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setStatus(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return status
}
