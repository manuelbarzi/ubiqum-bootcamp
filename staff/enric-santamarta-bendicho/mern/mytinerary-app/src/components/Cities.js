import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Home from './images/homeIcon.png'
import { NavLink } from 'react-router-dom'
import FilterCities from './FilterCities';
import { connect } from 'react-redux';
import { handleFilterCities, retrieveCities } from '../store/actions/cityActions';
import { retrieveItineraries } from '../store/actions/itinerariesActions'
import { withStyles } from '@material-ui/core/styles';


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
    text: {
        fontFamily: '"Helvetica Neue"',
        fontDisplay: 'swap',
        margin: 'auto',
        color: 'black',
        fontWeight: 600,
        fontSize: 25,
        padding: 20
    },
    logo: {
        width: 80
    },
    cities: {
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
    },
    button: {

    }

});



const mapStateToProps = (state) => ({
    filteredCities: state.cities.filteredCities,
    cities: state.cities.cities,
    error: state.cities.error
})

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveCities: () => dispatch(retrieveCities()),
        handleFilterCities: filter => dispatch(handleFilterCities(filter)),
        retrieveItineraries: city => dispatch(retrieveItineraries(city))
    }
}


class Cities extends Component {
    constructor() {
        super()
        this.state = {
            isFetching: false,
        }
    }

    componentDidMount() {
        this.props.retrieveCities()
    }

    handleFilter = (filter) => {
        this.props.handleFilterCities(filter)
    }

    handleClick = (event ) => {
        const city = event.target.value

        this.props.retrieveItineraries(city)
        
    }


    render() {

        const { classes } = this.props

        const { props: { cities, filteredCities }, state: { isFetching } } = this

        const _cities = filteredCities && filteredCities.length ? filteredCities : cities

        const citiesRender = _cities.map((city, index) => <TableRow key={index}><TableCell key={index} className={classes.tablecell} align="center">
            <NavLink to={`/cities/${city._id}/itineraries`}><button value={city._id}> {city.name} </button></NavLink> </TableCell>
            <TableCell className={classes.tablecell} align="center"><img style={{ width: 200, height: 100 }} alt="city" src={city.image} /> </TableCell>
            <TableCell className={classes.tablecell} align="center"> {city.country} </TableCell></TableRow>)

        return <Box className={classes.cities}>
            <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox} >
                <Box className={classes.box} bgcolor="error.main" borderRadius={40} textAlign="center" >
                            <h1 className={classes.applogo}>City List</h1>
                            <p>Search a city name:</p>
                            <FilterCities onChange={this.handleFilter} />
                            <TableContainer>
                        <form onClick={this.handleClick}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow><TableCell className={classes.tablecell} align="center"><p className={classes.text}>City</p></TableCell><TableCell className={classes.tablecell} align="center"><p className={classes.text}>Image</p></TableCell><TableCell className={classes.tablecell} align="center"><p className={classes.text}>Country</p></TableCell></TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {citiesRender}
                                    </TableBody>
                                </Table>
                            </form>
                    </TableContainer>
                </Box>
                <footer className={classes.footer}>
                    <NavLink to='/' ><Button><img className={classes.logo} src={Home} alt="return home" /> </Button></NavLink>
                </footer>
            </Box>
        </Box>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Cities))



