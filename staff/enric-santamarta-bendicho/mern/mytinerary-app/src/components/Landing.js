import { NavLink, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Circle from './images/circled-right-2.png'
import { MusicNoteSharp, AirplanemodeActiveSharp, RestaurantSharp, TrainSharp } from '@material-ui/icons';
import isUserLoggedIn from '../logic/is-user-logged-in';
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { retrieveUser } from '../store/actions/userActions'
import { userLogout } from '../store/actions/userActions'

const useStyles = makeStyles({
  applogo: {
    fontFamily: '"Helvetica Neue"',
    fontDisplay: 'swap',
    margin: 'auto',
    color: 'white',
    fontWeight: 10000,
    fontSize: 70,
    padding: 20

  },
  logo: {
    width: 80
  },
  landing: {
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
  }

});

const mapStateToProps = (state) => ({
  user: state.user.user,
  error: state.user.error
})


const mapDispatchToProps = (dispatch) => {
  return {
    retrieveUser: () => dispatch(retrieveUser()),
    userLogout: () => dispatch(userLogout())

  }
}

function Landing({ user, retrieveUser, userLogout }) {
  const history = useHistory()

  useEffect(() => {
    (async () => {
      try {
        await retrieveUser()

      } catch (error) {
        alert(error.message)

        history.push('/login')
      }
    })()

    return () => {
    }
  }, [])

  const handleLogout = () => {
    userLogout()

    history.push('/')
  }

  const classes = useStyles();

  return (<Box display="flex" className={classes.landing}>
    <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox}>
      <Box bgcolor="error.main" borderRadius={40} className={classes.box}>
        <div>
          <h1 className={classes.applogo}>MYtinerary</h1>
          <MusicNoteSharp /> <AirplanemodeActiveSharp /> <RestaurantSharp /> <TrainSharp />
        </div>
        <p>Find your perfect trip, designed by insiders who know and love their cities.</p>
        <h2>Start browsing</h2>
        <div style={{ width: '100%' }}>
          <NavLink to='/cities'><Button><img className={classes.logo} src={Circle} alt="Page Cities" /></Button></NavLink>
        </div>
        {isUserLoggedIn() && <div>Name:{user.name}<div> Email:{user.email}</div><div>< img src={user.foto} width="100" height="100" /></div><button onClick={handleLogout}>Logout</button> </div>}
        {!isUserLoggedIn() && <div>GO TO LOGIN</div>}
        <div>
          <p>Want to build your own MYtinerary?</p>
          {!isUserLoggedIn() && <Button><NavLink to='/login'>Log in</NavLink></Button>}
          {!isUserLoggedIn() && <Button><NavLink to='/register'>Create Account</NavLink></Button>}
        </div>
      </Box>
    </Box>
  </Box>)

}


export default connect(mapStateToProps, mapDispatchToProps)(Landing)