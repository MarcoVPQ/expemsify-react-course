import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { history } from './router/AppRouter';
import configStore from './store/configStore';


//actions
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/aut';

//Styles
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

//firebase
import  { firebase } from './firebase/firebase'

//promises
//import './playground/promises'
import  LoadingPage  from './components/LoadingPage';

const store = configStore();

const jsx = (
    <Provider store={store}>
        <AppRouter /> 
    </Provider>

);

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx,document.getElementById('root'));
        hasRendered = true; 
    }
}

ReactDOM.render(<LoadingPage />,document.getElementById('root'));




firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(() => {
        renderApp() 
        if (history.location.pathname === '/') {
        history.push('/dashboard')
        }
    }) 
    }else {
        store.dispatch(logout())
        renderApp() 
        history.push('/')
    }
})