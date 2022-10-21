import { Button, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import React from "react"
import "./login.css" 

const Verify = (props) => {
    const paperStyle={height: '23em', width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const signupButtonStyle = {marginTop: '1.4em'}
    const sendCodeAgainStyle = {paddingTop: '1.4em'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                    <Typography>
                        Enter the code that has been sent to your email.
                    </Typography>
                    <TextField style={textFieldStyle} id="outlined-basic" label="Code" variant="outlined" placeholder="Code" fullWidth required />
                    <Button onClick={props.enter} style={signupButtonStyle} variant="contained" type="submit" color="primary" fullWidth>Enter</Button>
                    <Grid style={sendCodeAgainStyle} container direction="row" justifyContent="flex-start" alignItems="center">
                        <Typography display="inline">
                            <Link>Send code again</Link>
                        </Typography>
                    </Grid>
            </Paper>
        </Grid>
    )
}

export default Verify