import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyBfY9GaVr4ygyD8_lBFiJHbucMSg9JorF4',
  authDomain: 'fakeappip.firebaseapp.com',
  projectId: 'fakeappip',
  storageBucket: 'fakeappip.appspot.com',
  messagingSenderId: '392785866063',
  appId: '1:392785866063:web:2d3ca859fa77e547dc293a',
  measurementId: 'G-P1EQQR0KYS',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export { firebase };
