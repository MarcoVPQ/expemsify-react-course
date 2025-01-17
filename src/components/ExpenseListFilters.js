import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates'

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';



export class ExpenseListFilters extends React.Component {
    
    state = {
        calendarFocused : null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) =>{
        this.setState(() => ({ calendarFocused }))
    }

    onTextChange = (e)=>{
        this.props.setTextFilter(e.target.value)
    }

    onSelectChange = (e)=>{
        const value = e.target.value
        
        if (value === "amount") {
            this.props.sortByAmount();
        }
        if (value === "date") {
        this.props.sortByDate();
        }
    }

    render() {
        return(
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                    <input  
                    className="text-input"
                    placeholder="Search expenses"
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}/>
                    </div>
                    <div className="input-group__item">
                    <select
                    className="select"
                    onChange={this.onSelectChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    </select>
                    </div>
                    <div className="input-group__item">
                    <DateRangePicker 
                    startDate ={this.props.filters.startDate}
                    endDate={ this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false }
                    showClearDates={true}
                    />
                    </div>
                </div>  
            </div>
        )
  
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        setStartDate: (startDate) =>dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByAmount: () => dispatch(sortByAmount()),
        sortByDate: () => dispatch(sortByDate())
    })

const mapStateToProps = (state) => ({
    filters: state.filters,
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);