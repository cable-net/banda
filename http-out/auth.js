const superagent = require('superagent')

module.exports.emailRegistered = async (email, token) => {
  const queryArguments = {
    'auth-token': token
  }
  try {
    const response = await superagent.get('http://cadenero-staging.herokuapp.com/api/auth/email/' + email + '/registered').query(queryArguments)
    if (response.statusCode === 200) {
      return true
    }
  } catch (error) {
    if (error.status === 404) {
      return false
    }
    return true
  }
}
