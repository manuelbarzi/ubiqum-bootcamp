import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import homeIcon from './homeIcon.png';
import createHistory from 'history/createBrowserHistory'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { retrieveItineraries } from "../store/actions/itineraryActions";
import retrieveAccount from '../store/actions/accountAction';
import addFavoriteItinerary from '../store/actions/favoriteItineraryActions';
import retrieveCommentsByCity from '../store/actions/commentsAction';
import postComment from '../store/actions/postCommentAction';

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveAccount: (token) => dispatch(retrieveAccount(token)),
        retrieveItineraries: (cityId) => dispatch(retrieveItineraries(cityId)),
        addFavoriteItinerary: (token, itineraryId) => dispatch(addFavoriteItinerary(token, itineraryId)),
        retrieveCommentsByCity: (cityId) => dispatch(retrieveCommentsByCity(cityId)),
        postComment: (name, comment, cityId) => dispatch(postComment(name, comment, cityId))
    }
}

const mapStateToProps = state => {
    return {
        account: state.account.account,
        favorites: state.favorites.favorite,
        itineraries: state.itinerary.itinerary,
        comments: state.comments.comments,
        error: state.cities.error,
    }
}

function Itinerary(props) {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');


    useEffect(() => {
        if (!props.account && sessionStorage.getItem('token') != 'undefined') { props.retrieveAccount(sessionStorage.getItem('token')) }
        props.retrieveItineraries(sessionStorage.getItem('cityId'))
        props.retrieveCommentsByCity(sessionStorage.getItem('cityId'))
    }, []);

    function handleClick() {
        sessionStorage.clear()
        window.location.reload();
    }

    function handleFavorite(itineraryId) {
        props.addFavoriteItinerary(sessionStorage.getItem('token'), itineraryId)
        const history = createHistory();
        history.go(0)
    }

    const handleSubmit = event => {
        event.preventDefault()

        props.postComment(name, comment, sessionStorage.getItem('cityId'))
    }

    if (props.account) return (
        <div>
            <footer>
                <div>
                    {props.itineraries && props.itineraries.map(itinerary => {
                        const backgroundColor = props.account.favItineraries.some(_itinerary => _itinerary._id === itinerary._id) ? 'lightgreen' : 'gray'

                        return <div  style={{ padding: '5px' }}>
                            <button onClick={() => handleFavorite(itinerary._id)} style={{ backgroundColor }}>&nbsp;</button>
                            {itinerary.name}
                        </div>
                    })
                    }
                </div>
                <div  style={{ padding: '20px' }}> 
                    <TableContainer>
                        <Table size='small'>
                            <TableBody>
                                {props.comments && props.comments.map(comment => (
                                    <TableRow>
                                        <TableCell>
                                            <p>{comment.name}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{comment.comment}</p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <h3 style={{ textAlign: 'center', padding: '40px'}}><p>Post A Comment</p></h3>
                    <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
                        <label className='name'>
                            name :
                            <input required type="text" name="name" style={{width: '100px'}} onChange={e => setName(e.target.value)}/>
                        </label>
                        <label className='comment ml-5'>
                            comment :
                            <input required type="comment" className="Comment ml-7" onChange={e => setComment(e.target.value)}/>
                        </label>
                        <input type="submit" value="Post"/>
                    </form>
                </div>
                <div style={{ padding: '50px' }}>
                    <img className='homeI' src={props.account.picture} alt="pictureAccount" />
                </div>
                <div style={{ textAlign: 'center', marginRight: '10px' }}>
                    <p>{props.account.email}</p>
                    <Link to='/' refresh="true" onClick={handleClick}><span>LogOut</span></Link>
                </div>
                <div>
                    <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                </div>
            </footer>
        </div>
    )
    else return (
        <div>
            <footer>
                <div>
                    {props.itineraries && props.itineraries.map(itinerary => {
                        return <div>
                            {itinerary.name}
                        </div>
                    })
                    }
                </div>
                <div>
                    <Link to='/'><img className='homeI' src={homeIcon} alt="HomeIcon" /></Link>
                </div>
            </footer>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
