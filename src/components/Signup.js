import { Button, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import React from "react"
import "./login.css" 

const Signup = (props) => {
    const paperStyle={height: '23em', width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const linksStyle = {marginTop: '2em'}
    const signupButtonStyle = {marginTop: '1.4em'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                    <TextField style={textFieldStyle} id="outlined-basic" label="Username" variant="outlined" placeholder="Username" fullWidth required />
                    <TextField style={textFieldStyle} id="outlined-basic" label="Email" variant="outlined" placeholder="Email" fullWidth required />
                    <TextField style={textFieldStyle} id="outlined-basic" type="password" label="Password" variant="outlined" placeholder="Password" fullWidth required />
                    <Button style={signupButtonStyle} onClick={props.verify} variant="contained" type="submit" color="primary" fullWidth>Sign up</Button>
                    <Grid style={linksStyle} container direction="row" justifyContent="flex-end" alignItems="center">
                        <Typography display="inline">
                        <Link onClick={props.signin}>Sign in</Link>
                        </Typography>
                    </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup