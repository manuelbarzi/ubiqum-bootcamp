import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homeIcon from './homeIcon.png';
import { retrieveCities } from "../store/actions/cityActions";
import { retrieveItineraries } from "../store/actions/itineraryActions"

const mapStateToProps = (state) => ({
    cities: state.cities.cities,
    error: state.cities.error,
})

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItinerary: (city) => dispatch(retrieveItineraries(city)),
        retrieveCities: () => dispatch(retrieveCities())
    }
}

class Cities extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            filteredCities: [],
        }
    }

    componentWillMount() {
        this.props.retrieveCities()
    }

    async componentDidMount() {
        this.setState({ loading: false })
    }

    componentWillReceiveProps(props) {
        const { cities } = props

        this.setState({
            cities,
            filteredCities: cities
        })
    }

    handleFilterChange(event) {
        const filteredCities = this.state.cities.filter((city) => city.name.toLowerCase().startsWith(event.target.value.toLowerCase()));

        this.setState({ filteredCities })
    }

    handleClick = (city) => {
        this.props.retrieveItinerary(city)
    }

    render() {
        const { state: { filteredCities, loading }, props: { error } } = this

        if (loading) {
            return <div><h1 style={{ textAlign: "center" }}>...Page is loading...</h1></div>
        }
        if (error) {
            return (
                <div><h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
                    <div>
                        <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                    </div>
                </div>

            )
        }

        return (
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
                                <button onClick={() => this.handleClick(city.name)}>
                                    {city.name}
                                </button>
                            </div>
                        ))}
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
