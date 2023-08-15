import React from 'react';
import ReactDOM from 'react-dom/client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: 'AIzaSyCclB-KX1UeGdH8rs2IJTqJ6k2HbA17oY4',
  authDomain: 'pazpj-256be.firebaseapp.com',
  projectId: 'pazpj-256be',
  storageBucket: 'pazpj-256be.appspot.com',
  messagingSenderId: '3944589911',
  appId: '1:3944589911:web:65486b6a38add6a2271112',
  measurementId: 'G-5G0YXNH5EP',
};

firebase.initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
