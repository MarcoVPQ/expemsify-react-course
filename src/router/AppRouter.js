import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';


import ExpenseDashBoardPage from '../components/Dashboard';
import AddExpensePage from '../components/CreateExpense';
import EditExpensePage from '../components/EditExpense';
import Notfound from '../components/NotFound';
import LoginPage from './../components/LoginPage';
import  PrivateRoute  from './PrivateRoute';
import  PublicRoute  from './PublicRoute';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashBoardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route  component={Notfound} />
            </Switch> 
        </div>
    </Router>
)

export default AppRouter
	
