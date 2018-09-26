let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://yourdomain.com/api/'
} else {
    baseUrl = 'http://localhost:3000'
}
export const apiUrl = baseUrl