import { Button, Grid, Link, TextField, Typography, Card, CardContent  } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import React, { useRef }  from "react"
import "./login.css" 

const Signup = (props) => {
    const paperStyle={width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const linksStyle = {marginTop: '2em'}
    const signupButtonStyle = {marginTop: '1.4em'}

    const usernameRef = useRef('usernameRef')
    const passwordRef = useRef('passwordRef')
    const emailRef = useRef('emailRef')

    const signup = async () => {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
        })
        if (response.status === 200) {
            props.verify(response.status, '', emailRef.current.value, '');            
        } else {
            props.verify(response.status, await response.json(), '', '')
        }
    }

    return (
        <Grid>
            <Card elevation={10} style={paperStyle}>
                <CardContent>
                    <TextField style={textFieldStyle} inputRef={usernameRef} id="username" label="Username" variant="outlined" placeholder="Username" fullWidth required />
                    <TextField style={textFieldStyle} inputRef={emailRef} id="email" label="Email" variant="outlined" placeholder="Email" fullWidth required />
                    <TextField style={textFieldStyle} inputRef={passwordRef} id="password" type="password" label="Password" variant="outlined" placeholder="Password" fullWidth required />
                    <Button style={signupButtonStyle} onClick={signup} variant="contained" type="submit" color="primary" fullWidth>Sign up</Button>
                    <Grid style={linksStyle} container direction="row" justifyContent="flex-end" alignItems="center">
                        <Typography display="inline">
                        <Link onClick={props.signin}>Sign in</Link>
                        </Typography>
                    </Grid>
                </CardContent>
                {props.errorMessage !== '' &&
                    <CardContent>
                        <Alert severity="error">{props.errorMessage}</Alert>
                    </CardContent>
                }
            </Card>
        </Grid>
    )
}

export default Signup