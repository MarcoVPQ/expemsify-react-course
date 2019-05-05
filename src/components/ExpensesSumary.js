import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import selectExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/totalExpenses'


 export class ExpensesSummary extends React.Component{
     constructor(props){
         super(props)
     }
   
    render(){
        return (
            <div className="page-header">
                <div className="content-container">
                {
                    this.props.expenses.length === 1 
                    ? ( <h2 className="page-header__title">Viewing <span>1</span> expense for a total of <span>{this.props.totalExpenses}</span></h2>)
                    : ( <h2 className="page-header__title">Viewing <span>{this.props.expenses.length}</span> expenses for a total of <span>{this.props.totalExpenses}</span></h2>)
                }
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
            </div>
        )
    }
 }



const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        totalExpenses: totalExpenses(selectExpenses(state.expenses, state.filters))
    }
}
export default connect(mapStateToProps)(ExpensesSummary)