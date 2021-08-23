import React, { useState } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homeIcon from './homeIcon.png';
import registerUserAccount from '../store/actions/registerActions'

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserAccount: (email, password, picture) => dispatch(registerUserAccount(email, password, picture)),
    }
}

function CreateAccount({registerUserAccount}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = event => {
        event.preventDefault()

        registerUserAccount(email, password, picture)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='mr-5'>
                    e-mail:
                    <input required type="text" name="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label className='password'>
                    password:
                    <input required type="password" name="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    picture:
                    <input type="text" name="picture" onChange={e => setPicture(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(CreateAccount)

