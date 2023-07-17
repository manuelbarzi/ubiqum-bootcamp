import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Home from './images/homeIcon.png'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { retrieveActivities } from '../store/actions/activitiesActions';


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
    activities: {
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
    activities: state.activities.activities,
    error: state.activities.error
})


const mapDispatchToProps = (dispatch) => {
    return {
        retrieveActivities: itineraryID => dispatch(retrieveActivities(itineraryID)),
    }
}

function Activities({ activities, retrieveActivities }) {

    useEffect(() => {

        (async () => {
            try {
                const activities = await retrieveActivities(itineraryID)
            }
            catch (error) {
                alert(error.message)
            }
        })()
    }, []);

    const { itineraryID } = useParams()

    const classes = useStyles();

    const activitiesRender = activities.map((activity, index) => <TableRow key={index}><TableCell className={classes.tablecell} align="center" key={index}><h2>{activity.activity}</h2>
    </TableCell><TableCell className={classes.tablecell}><img style={{ width: 200, height: 100 }} alt="activity itineraries" src={activity.image} /></TableCell>
    </TableRow>)

    return <div className={classes.activities}>
        <Box bgcolor="success.main" borderRadius={40} className={classes.bigbox}>
            <Box className={classes.box} bgcolor="error.main" borderRadius={40} className={classes.box}>
                <div>
                    <h1 className={classes.applogo}>Activities in</h1>
                </div>
                <div>
                    <TableContainer>
                        <Table size="small">
                            <TableBody>
                                {activitiesRender}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
            <footer className={classes.footer}>
                <NavLink to='/' ><Button><img className={classes.logo} src={Home} alt="return home" /> </Button></NavLink>
            </footer>
        </Box>
    </div>

}


export default connect(mapStateToProps, mapDispatchToProps)(Activities)