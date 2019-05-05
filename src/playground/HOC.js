import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>(
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

//step one create a function
const withAdminWarning = (WrappedComponent)=>{
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Don't share</p>}
            <WrappedComponent {...props}/>
        </div>   

    )
}

//step two make const use the return value from the function
const AdminInfo = withAdminWarning(Info);

//Challenge
//create function

const requireAuthentication = (WrappedComponent)=> {
    return (props)=>(
        <div>
            {props.isAuthenticated ? ( <WrappedComponent {...props} />)
            :(<p>Needs Auth token to see this</p>)}
           
        </div>
    )
}
const AuthInfo = requireAuthentication(Info)

//ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('root'))
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('root'))