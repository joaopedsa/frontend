const isAuthenticated = () => {
    localStorage.getItem('token')

}
const getToken = () => localStorage.getItem('token')
const setToken = (token) => localStorage.setItem('token', token)
const deleteToken = () => localStorage.removeItem('token')

module.exports = {
    getToken,
    setToken,
    deleteToken,
    isAuthenticated
}