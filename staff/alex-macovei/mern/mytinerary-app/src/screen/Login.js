import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homeIcon from './homeIcon.png';
import { MDBContainer } from 'mdbreact';
import { MDBBtn } from "mdbreact";

export default function Login() {

    const handleSubmit = event => {
    }

    return (
        <div>
            <footer>
                <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
                    <label className="ml-5 ml-lg-0">
                        e-mail:
                        <input required type="text" name="email" onChange={null} />
                    </label>
                    <label className='password ml-5'>
                        password:
                        <input required type="password" name="password" onChange={null} />
                    </label>
                    <input type="submit" value="Submit" className='password ml-2' />
                </form>
                <div>
                    <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                </div>
            </footer>
        </div>
    )
}
