import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import homeIcon from './homeIcon.png';
import { retrieveCities } from "../store/actions/cityActions";
import { retrieveItineraries } from "../store/actions/itineraryActions"
import retrieveAccount from '../store/actions/accountAction';

const mapStateToProps = (state) => ({
    cities: state.cities.cities,
    account: state.account.account,
    error: state.cities.error,
})

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItineraries: (cityId) => dispatch(retrieveItineraries(cityId)),
        retrieveCities: () => dispatch(retrieveCities()),
        retrieveAccount: (token) => dispatch(retrieveAccount(token)),
    }
}

class Cities extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            filteredCities: [],
            favs: [],
        }

    }

    componentWillMount() {
        this.props.retrieveCities()
    }

    async componentDidMount() {
        this.setState({ loading: false })
        if (!window.sessionStorage.getItem('token')) this.props.retrieveAccount(sessionStorage.getItem('token'))
    }

    componentWillReceiveProps(props) {
        const { cities } = props
        const { account } = props

        this.setState({
            cities,
            filteredCities: cities,
            account,
        })

    }
    
    handleFilterChange(event) {
        const filteredCities = this.state.cities.filter((city) => city.name.toLowerCase().startsWith(event.target.value.toLowerCase()));

        this.setState({ filteredCities })
    }

    handleClick(cityId) {
        sessionStorage.setItem('cityId', cityId)

        //TODO this.props.history.push('/<cidty-id>/itineraries') React Router DOM parameteres in routes
    }

    handleFavorite = (cityName) => {

    }

    handleLogOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    render() {
        const { state: { account, filteredCities, loading, favs }, props: { error } } = this

        if (loading)
            return <div><h1 style={{ textAlign: "center" }}>...Page is loading...</h1></div>

        if (error)
            return (
                <div><h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
                    <div>
                        <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                    </div>
                </div>

            )


        if (!account) return (
            <div className='container'>
                <footer>
                    <div>
                        <label htmlFor="filter">Filter by City: </label>
                        <input type="text" id="filter"
                            value={this.state.cityFilter}
                            onChange={this.handleFilterChange.bind(this)}
                            placeholder="Search city..."
                        />

                    </div>
                    <div>
                        {filteredCities.map(city => (
                            <div>
                                <Link to='/itineraries'>
                                    <button onClick={() => this.handleClick(city._id)} style={{ backgroundColor: 'lightBlue' }}>
                                        {city.name}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                    </div>
                </footer>
            </div>
        )

        if (account) return (
            <div className='container'>
                <footer>
                    <div>
                        <label htmlFor="filter">Filter by City: </label>
                        <input type="text" id="filter"
                            value={this.state.cityFilter}
                            onChange={this.handleFilterChange.bind(this)}
                            placeholder="Search city..."
                        />

                    </div>
                    <div>
                        {filteredCities.map(city => (
                            <div>
                                <button onClick={() => this.handleFavorite(city._id)} style={{ backgroundColor: 'gray' }}><a>&nbsp;</a></button>
                                <Link to='/itineraries'>
                                    <button onClick={() => this.handleClick(city._id)} style={{ backgroundColor: 'lightBlue' }}>
                                        {city.name}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '50px' }}>
                        <img className='homeI' src={account.picture} alt="pictureAccount" />
                    </div>
                    <div style={{ textAlign: 'center', marginRight: '10px' }}>
                        <p>{account.email}</p>
                        <Link to='/' refresh="true" onClick={() => this.handleLogOut()}><span>LogOut</span></Link>
                    </div>
                    <div>
                        <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                    </div>
                </footer>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
