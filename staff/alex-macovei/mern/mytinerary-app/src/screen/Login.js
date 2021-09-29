import React, { useState } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homeIcon from './homeIcon.png';
import loginUserAccount from '../store/actions/loginActions';
import retrieveAccount from '../store/actions/accountAction';

const mapDispatchToProps = (dispatch) => {
    return {
        loginUserAccount: (email, password) => dispatch(loginUserAccount(email, password)),
        retrieveAccount: (token) => dispatch(retrieveAccount(token)),
    }
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        account: state.account.account,
    }
}

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault()

        props.loginUserAccount(email, password)
    }


    var token = props.token;

    if (token) {
        props.retrieveAccount(token)
        sessionStorage.setItem('token', token)
        window.location.href = "http://localhost:3000/";
    }

    return (
        <div>
            <footer>
                <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
                    <label className="ml-5 ml-lg-0">
                        e-mail:
                        <input required type="text" name="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className='password ml-5'>
                        password:
                        <input required type="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" className='password ml-2' />
                    <Link to="#" >
                        <button>Login With Google</button>
                    </Link>
                </form>
                <div>
                    <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                </div>
            </footer>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
