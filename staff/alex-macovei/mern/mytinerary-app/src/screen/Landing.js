import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './MYtineraryLogo.png';
import startBrowsing from './start-browsing.png'
import homeIcon from './homeIcon.png'
import { connect } from 'react-redux';
import retrieveAccount from '../store/actions/accountAction';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveAccount: (token) => dispatch(retrieveAccount(token)),
    }
}

const mapStateToProps = state => {
    return {
        account: state.account.account,
    }
}

function Landing(props) {

    if (!props.account && sessionStorage.getItem('token') != 'undefined') props.retrieveAccount(sessionStorage.getItem('token'))


    function handleClick() {
        sessionStorage.clear()
        window.location.reload();
    }

    if (props.account) return (
        <div className='container'>
            <footer>
                <div>
                    <img className='logoIcon' src={logo} alt="Logo" />
                </div>
                <p style={{ textAlign: 'center', padding: '40px' }}> find your perfect trip,
                    designed by insiders who know and love their cities.</p>
                <div>
                    <h3 style={{ textAlign: 'center' }}>Start browsing</h3>
                    <Link to='/cities'><img className='browsing' src={startBrowsing} alt="Browsing" /></Link>
                </div>
                <p style={{ textAlign: 'center', padding: '30px' }}>Want to build your own MYtinerary?</p>
                <div style={{ padding: '50px' }}>
                    <img className='homeI' src={props.account.picture} alt="pictureAccount" />
                </div>
                <div style={{ textAlign: 'center', marginRight: '10px' }}>
                    <p>{props.account.email}</p>
                    <Link to='/' refresh="true" onClick={handleClick}><span>LogOut</span></Link>
                </div>
                <div>
                    <img className='homeI' src={homeIcon} alt="HomeIcon" />
                </div>
            </footer>
        </div>
    )

    return (
        <div className='container'>
            <footer>
                <div>
                    <img className='logoIcon' src={logo} alt="Logo" />
                </div>
                <p style={{ textAlign: 'center', padding: '40px' }}> find your perfect trip,
                    designed by insiders who know and love their cities.</p>
                <div>
                    <h3 style={{ textAlign: 'center' }}>Start browsing</h3>
                    <Link to='/cities'><img className='browsing' src={startBrowsing} alt="Browsing" /></Link>
                </div>
                <p style={{ textAlign: 'center', padding: '30px' }}>Want to build your own MYtinerary?</p>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/login'><span className='mr-5' style={{ textAlign: 'left' }}>Log In</span></Link>
                    <Link to='/createAccount'><span className='mr-7' style={{ textAlign: 'right' }}>Create Account</span></Link>
                </div>
                <div>
                    <img className='homeI' src={homeIcon} alt="HomeIcon" />
                </div>
            </footer>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
