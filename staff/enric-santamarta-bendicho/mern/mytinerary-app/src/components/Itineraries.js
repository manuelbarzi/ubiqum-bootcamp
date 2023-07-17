import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Home from './images/homeIcon.png'
import { connect } from 'react-redux';
import { retrieveActivities } from '../store/actions/activitiesActions'
import { retrieveComments, retrieveItineraries } from '../store/actions/itinerariesActions'
import { retrieveUser } from '../store/actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addToFavorites } from '../store/actions/itinerariesActions'
import { sendComment } from '../store/actions/itinerariesActions'
import FavoriteIcon from '@material-ui/icons/Favorite';
import isUserLoggedIn from '../logic/is-user-logged-in';



const useStyles = makeStyles({
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
    itineraries: {
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
    itineraries: state.itineraries.itineraries,
    error: state.itineraries.error,
})

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveActivities: itineraryID => dispatch(retrieveActivities(itineraryID)),
        addToFavorites: itineraryId => dispatch(addToFavorites(itineraryId)),
        retrieveUser: () => dispatch(retrieveUser()),
        retrieveItineraries: cityID => dispatch(retrieveItineraries(cityID)),
        sendComment: (comment,itinerary) => dispatch(sendComment(comment,itinerary))
    }
}

function Itineraries({ user, itineraries, retrieveActivities, addToFavorites, retrieveUser, retrieveItineraries, sendComment }) {

    useEffect(() => {

        (async () => {
            try {

                const user = await retrieveUser()

                const itineraries = await retrieveItineraries(cityID)

            }
            catch (error) {
                alert(error.message)
            }
        })()
    }, [itineraries]);
    // if you want to run only once, just leave array empty []

    const { cityID } = useParams()

    const classes = useStyles();

    const [favs, setFavs] = useState(user.favorites)

    const handleClickFavorite = (event) => {

        const itineraryId = event.currentTarget.value

        const index = favs.includes(itineraryId)

        if (index > -1)
            setFavs(favs.slice(index, 1))
        if (index > 0)
            setFavs(favs.slice(index, 0))
        else
            setFavs([...favs, itineraryId])

        addToFavorites(itineraryId)
    }

    const handleClickActivities = (event) => {

        const itineraryID = event.currentTarget.value

        retrieveActivities(itineraryID)
    }

    const handleClickComment = (event) => {

        event.preventDefault()

        const comment = event.target.text.value

        const index = event.target.getAttribute("data-index")

        const itinerary = itineraries[index]._id

        sendComment(comment, itinerary)
    }


    const itinerariesRender = itineraries.map((itinerary, index) =>

        <TableBody key={index}>
            <TableRow key={index}>
                <TableCell key={index} align="center" className={classes.tablecell}>
                    <div><h2>{itinerary.title}</h2>
                    </div><div>Duration:{itinerary.duration}</div>
                    <div>Rating:{itinerary.rating}</div>
                </TableCell>
                <TableCell align="center" className={classes.tablecell} ><img style={{ width: 200, height: 100 }} alt="city itineraries" src={itinerary.profilePicture} /></TableCell>
                <TableCell align="center" className={classes.tablecell}>
                    <NavLink to={`/cities/${itinerary._id}/Activities`} ><button onClick={handleClickActivities} value={itinerary.title}>Activities </button></NavLink>
                    {isUserLoggedIn() && <IconButton key={index} onClick={handleClickFavorite} value={itinerary._id}>{favs.includes(itinerary._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>}
                </TableCell>
            </TableRow>
            {itinerary.comments.map((comment, subindex) => <TableRow key={subindex}>
                {comment.user.map((user) => <TableCell align="center"><h2>{user.name}</h2></TableCell>)}
                {comment.user.map((user) => <TableCell align="center"><img style={{ width: 70, height: 70 }} alt="user fotos" src={user.foto} /></TableCell>)}
                <TableCell align="center">{comment.comment}</TableCell>
            </TableRow>)}
            <TableRow>
                <TableCell></TableCell>
                <TableCell>
                    {isUserLoggedIn() &&
                        <form onSubmit={handleClickComment} key={index} data-index={index}>
                            <input type="text" id="text" name="fname" height="200" />
                            <button>Comment</button>
                        </form>}
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableBody>)


    return <Box display="flex" className={classes.itineraries}>
        <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox}>
            <Box className={classes.box} bgcolor="error.main" borderRadius={40}>
                <div>
                    <h1 className={classes.applogo}>Itineraries in </h1>
                </div>
                <div>
                    <TableContainer>
                        <Table size="small">
                            <TableBody>
                                {itinerariesRender}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
            <footer className={classes.footer}>
                <NavLink to='/' ><Button><img className={classes.logo} src={Home} alt="return home" /> </Button></NavLink>
            </footer>
        </Box>
    </Box>
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)