import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SIZES } from '@/Theme/Variables'
import { setLocationFirst, setShippingAddress } from '@/Store/location'
import Spacer from '../Base/Spacer'
import ListRightIcon from './ListRightIcon'

const SearchLocationResults = ({
  isModal = false,
  selectedCity = () => {},
  marginTop = 20,
  ...props
}) => {
  return (
    <View style={{ marginTop: marginTop, marginHorizontal: SIZES.margin_h }}>
      {props.isLoading ? (
        <Spacer height={0} />
      ) : (
        <>
          {isModal
            ? props.data.map((item, index) => (
                <ListRightIcon
                  key={index}
                  onPress={() => selectedCity(item)}
                  item={item}
                />
              ))
            : props.data.map((item, index) => (
                <ListRightIcon
                  key={index}
                  onPress={async () => {
                    await props.dispatch(
                      setShippingAddress({ data: item, isLoading: true }),
                    )
                    props.dispatch(setLocationFirst(true))
                    props.navigation.navigate('Home', { isSetLocation: true })
                  }}
                  item={item}
                />
              ))}
        </>
      )}
    </View>
  )
}

export default SearchLocationResults

const styles = StyleSheet.create({})
