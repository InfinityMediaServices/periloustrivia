import Rebase from 're-base';
import firebase from 'firebase';
import creds from './base-creds';

const firebaseApp = firebase.initializeApp(creds);
const base = Rebase.createClass(firebaseApp.database());

export {
  firebaseApp,
  base,
};
