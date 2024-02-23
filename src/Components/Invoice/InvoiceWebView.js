import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { WebView } from 'react-native-webview'
import NavBarV1 from '../Base/NavBarV1'
import IconHelpCenter from '../Base/IconHelpCenter'
import LoadingIndicator from '../Base/LoadingIndicator'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'
import { useToast } from 'react-native-toast-notifications'
import ModalLoadingCenter from '../Base/ModalLoadingCenter'

const InvoiceWebView = ({ pdfurl, idInvoice, ...props }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loadingWebview, setloadingWebview] = useState(true)

  const { config, fs } = RNFetchBlob
  // const idInvoice = '10750121070779977'
  const pdfUrl = pdfurl.invoice_link
  const invoice_id = pdfurl.invoice_id
  const toast = useToast()
  const [loading, setloadingshare] = useState(false)
  const [] = useState()

  useEffect(() => {}, [])

  const invoiceUrl = `https://lavender.prestisa.id//view-invoice/${invoice_id}`
  console.log(invoiceUrl)

  const downloadInvoice = async () => {
    const fileName = `Invoice_Prestisa_${invoice_id}.pdf`
    const destPath = fs.dirs.DownloadDir + '/' + fileName
    console.log(pdfUrl)

    const res = await RNFetchBlob.config({
      fileCache: true,
      path: destPath,
      addAndroidDownloads: {
        useDownloadManager: true,
        description: `Download ${destPath}`,
        notification: true,
        mime: 'application/pdf',
        title: destPath,
        path: destPath,
      },
    })
      .fetch('GET', pdfUrl, {
        // Authorization: 'Bearer ' + Api.Bearer,
      })
      .then(res => {
        toast.show('Invoice berhasil di download', {
          type: 'custom_success',
          duration: 4500,
          data: { height: 270 },
        })
      })
  }

  const sharePDFWithAndroid = type => {
    setloadingshare(true)
    const fileName = `Invoice_Prestisa_${invoice_id}.pdf`
    const destPath = fs.dirs.DownloadDir + '/' + fileName

    let filePath = null
    let file_url_length = pdfUrl.length
    const configOptions = {
      fileCache: true,
      path: destPath,
      addAndroidDownloads: {
        useDownloadManager: true,
        description: `Download ${destPath}`,
        notification: true,
        mime: 'application/pdf',
        title: destPath,
        path: destPath,
      },
    }
    RNFetchBlob.config(configOptions)
      .fetch('GET', pdfUrl)
      .then(resp => {
        filePath = resp.path()
        console.log(filePath)
        return resp.readFile('base64')
      })
      .then(async base64Data => {
        base64Data = `data:application/pdf;base64,` + base64Data
        setloadingshare(false)
        await Share.open({ url: base64Data, filename: fileName })
        // remove the image or pdf from device's storage
        await fs.unlink(filePath)
      })
  }

  React.useLayoutEffect(() => {
    // setIsLoading(false)
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={[Layout.row]}>
            <FeatherIcon
              onPress={() => sharePDFWithAndroid()}
              style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
              name="share-2"
            />
            <FeatherIcon
              onPress={() => downloadInvoice()}
              style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
              name="download"
            />
          </View>
        )
      },
    })
  }, [navigation])

  //   const url = `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl}`
  return (
    <View style={{ height: '100%' }}>
      {/* <Text>Haloo</Text> */}
      {loadingWebview && (
        <LoadingIndicator titleStyle={'Memuat data...'} loadingSize={30} />
      )}
      <WebView
        onLoadStart={() => {
          setloadingWebview(true)
        }}
        onLoadEnd={() => {
          setloadingWebview(false)
        }}
        scalesPageToFit={true}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        style={{
          height: windowHeight - 100,
          width: windowWidth,
          flex: 1,
          resizeMode: 'cover',

          //   backgroundColor: 'black',
        }}
        containerStyle={{
          backgroundColor: 'black',
          height: windowHeight - 100,
          width: windowWidth,
          flex: 1,
        }}
        source={{
          uri: invoiceUrl,
        }}
      />
      <ModalLoadingCenter show={loading} />
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
})
export default InvoiceWebView
