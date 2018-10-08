let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'http://yourdomain.com/api/'
}else {
   baseUrl = 'http://192.168.4.186:3000'
}
export  const apiUrl = baseUrl