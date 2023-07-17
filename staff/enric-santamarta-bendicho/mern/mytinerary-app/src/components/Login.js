import { NavLink, Redirect, withRouter } from 'react-router-dom'
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Home from './images/homeIcon.png'
import { connect } from 'react-redux';
import { authenticateUserAccount } from '../store/actions/userActions' ;

const useStyles = theme => ({
    applogo: {
        fontFamily: '"Helvetica Neue"',
        fontDisplay: 'swap',
        margin: 'auto',
        color: 'white',
        fontWeight: 10000,
        fontSize: 50,
        padding: 20

    },
    logo: {
        width: 80
    },
    login: {
        minWidth: 800
    },
    bigbox: {
        width: 800,
        margin: 'auto'
    },
    box: {
        width: 650,
        margin: 'auto'
    },
    footer: {
        margin: 'auto'
    },
    tablecell: {
        borderBottom: 'none'
    }

});

const mapStateToProps = (state) => ({
    error: state.user.error,
    loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateUserAccount: (email, password) => dispatch(authenticateUserAccount(email, password))
    }
}

class Login extends Component {
    constructor() {
        super()
        
        this.state = {
            password: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.loggedIn)
            props.history.push('/')
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        const { state: { email, password } } = this


        this.props.authenticateUserAccount(email, password)
    }

    render() {

        const { props: { classes, error, loggedIn } } = this

        {loggedIn && <Redirect to="/" />}

        return <Box display="flex" className={classes.login}>
            <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox}>
                <Box bgcolor="error.main" borderRadius={40} className={classes.box}>
                    <div>
                        <h1 className={classes.applogo}>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <div>
                                    <p>E-mail:</p>
                                    <input type="text" onChange={this.handleChange} value={this.state.email} name="email"></input>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p>Password:</p>
                                    <input type="password" onChange={this.handleChange} value={this.state.password} name="password"></input>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input type="submit" value="Submit" />
                                </div>
                            </label>
                        </form>
                    </div>

                {error && <p>ERROR: {error}</p>}

                </Box>
                <footer className={classes.footer}>
                    <NavLink to='/' ><Button><img className={classes.logo} src={Home} alt="return home" /> </Button></NavLink>
                </footer>
            </Box>
        </Box>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(Login)))