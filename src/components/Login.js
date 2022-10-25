import { Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import React, { useRef } from "react"
import "./login.css" 

const Login = (props) => {
    const paperStyle={height: '20em', width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const linksStyle = {marginTop: '2em'}

    const usernameRef = useRef('usernameRef')
    const passwordRef = useRef('passwordRef')

    console.log(props.errorMessage)

    const openapp = async () => {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            })
        })
        props.openapp(response.status, await response.json());
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                    {props.errorMessage !== '' &&
                        <Alert severity="error">{props.errorMessage}</Alert>
                    }
                    <TextField style={textFieldStyle} inputRef={usernameRef} id="username" label="Username" variant="outlined" placeholder="Username" fullWidth required />
                    <TextField style={textFieldStyle} inputRef={passwordRef} id="password" type="password" label="Password" variant="outlined" placeholder="Password" fullWidth required />
                    <FormControlLabel control={<Checkbox name="remember-me" control="primary" />} label="Remember me" />
                    <Button onClick={openapp} variant="contained" type="submit" color="primary" fullWidth>Sign in</Button>
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