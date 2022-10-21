import { Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import React from "react"
import "./login.css" 

const Login = (props) => {
    const paperStyle={height: '20em', width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const linksStyle = {marginTop: '2em'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                    <TextField style={textFieldStyle} id="outlined-basic" label="Username" variant="outlined" placeholder="Username" fullWidth required />
                    <TextField style={textFieldStyle} id="outlined-basic" type="password" label="Password" variant="outlined" placeholder="Password" fullWidth required />
                    <FormControlLabel control={<Checkbox name="remember-me" control="primary" />} label="Remember me" />
                    <Button onClick={props.openapp} variant="contained" type="submit" color="primary" fullWidth>Sign in</Button>
                    <Grid style={linksStyle} container direction="row" justifyContent="space-between" alignItems="center">
                        <Typography display="inline">
                        <Link href='#'>Forgot password</Link>
                        </Typography>
                        <Typography display="inline">
                        <Link onClick={props.signup}>Sign up</Link>
                        </Typography>
                    </Grid>
            </Paper>
        </Grid>
    )
}

export default Login