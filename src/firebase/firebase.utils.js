import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBPXTUGbt_zA_xIOakRhWcBt8vrsyNQ0ac",
    authDomain: "my-ecommerce-db-5da7d.firebaseapp.com",
    databaseURL: "https://my-ecommerce-db-5da7d.firebaseio.com",
    projectId: "my-ecommerce-db-5da7d",
    storageBucket: "my-ecommerce-db-5da7d.appspot.com",
    messagingSenderId: "548770069435",
    appId: "1:548770069435:web:0b85f5ac8dfa683fec229e",
    measurementId: "G-P79NJ85NYN"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth)
      return;
    
    const userRef = firestore.doc(`/users/${userAuth.uid}`)

    const user = await userRef.get()
    const { displayName, email } = userAuth
    const createdAt = new Date()
    if (!user.exists) {
    try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('Error Creating User', error.message)
      }
    }
    return userRef 
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()

  provider.setCustomParameters({ prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase