export const parseWA = (href = String) => {
  const _href = href.split('/')
  const _phone_text = _href[3].split('=')
  const _phone = _phone_text[1].replace('&text', '')
  const _text = _phone_text[2].replace(/%20/g, ' ')

  return { phone: _phone, text: _text }
}

export const addDashPhone = (data = String) => {
  return (
    data.slice(0, 2) +
    '-' +
    data.slice(2, 6) +
    '-' +
    data.slice(6, 10) +
    '-' +
    data.slice(10, data.length)
  )
}
