import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBNxg4IHA-rhYfhTI2MCjl-kY1qAUJ5p1c',
  authDomain: 'bookfit-bfef4.firebaseapp.com',
  databaseURL: 'https://bookfit-bfef4.firebaseio.com',
  storageBucket: 'bookfit-bfef4.appspot.com',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000000000000000
export const userExpirationLength = 1000000000000000000000
export const repliesExpirationLength = 30000000000000000000
