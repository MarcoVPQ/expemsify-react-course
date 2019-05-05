import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'



const ExpenseListItem = ({description, amount ,createdAt, id}) => (
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            <h3 className="list-item__data"> {amount}</h3>
        </Link>
);


export default ExpenseListItem;

/* install numeral@2.0.6
and using it on the amount
numeral(amount / 100).format('$0,0.00')
commit
and heroku upload*/ 