import { Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography, Card, CardContent } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import React, { useRef } from "react"
import "./login.css" 

const Login = (props) => {
    const paperStyle={width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const linksStyle = {marginTop: '2em'}

    const usernameRef = useRef('usernameRef')
    const passwordRef = useRef('passwordRef')

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
        if (response.status === 200) {
            props.openapp(response.status, await response.json());
        } else {
            props.openapp(response.status, '')
        }
    }

    return (
        <Grid>
            <Card style={paperStyle}>
                <CardContent>
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
                </CardContent>
                {props.errorMessage !== '' && props.isError === true &&
                    <CardContent>
                        <Alert severity="error">{props.errorMessage}</Alert>
                    </CardContent>
                }
                {props.errorMessage !== '' && props.isError === false &&
                    <CardContent>
                        <Alert severity="success">{props.errorMessage}</Alert>
                    </CardContent>
                }
            </Card>
        </Grid>
    )
}

export default Login