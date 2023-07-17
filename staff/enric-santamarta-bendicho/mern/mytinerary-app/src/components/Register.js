import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Home from './images/homeIcon.png';
import { connect } from 'react-redux';
import { registerUserAccount } from '../store/actions/userActions';

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
    createaccount: {
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
    user: state.user.user,
    error: state.user.error
})


const mapDispatchToProps = (dispatch) => {
    return {
        registerUserAccount: (name, email, password, foto) => dispatch(registerUserAccount(name, email, password, foto))
    }
}



class CreateAccount extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            foto: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

        const { state: { name, email, password, foto } } = this


        this.props.registerUserAccount(name, email, password, foto)
    }



    render() {

        const { classes } = this.props

        return <Box display="flex" className={classes.createaccount}>
            <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox}>
                <Box className={classes.box} bgcolor="error.main" borderRadius={40}>
                    <h1 className={classes.applogo}>Create an Account</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <div>
                                <p>Name:</p>
                                <input type="text" onChange={this.handleChange} value={this.state.name} name="name"></input>
                            </div>
                        </label>
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
                                <p>Foto:</p>
                                <input type="text" onChange={this.handleChange} value={this.state.foto} name="foto"></input>
                            </div>
                        </label>
                        <label>
                            <div>
                                <input type="submit" value="Submit" />
                            </div>
                        </label>
                    </form>
                </Box>
                <footer className={classes.footer}>
                    <NavLink to='/' ><Button><img className={classes.logo} src={Home} alt="return home" /> </Button></NavLink>
                </footer>
            </Box>
        </Box>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CreateAccount))