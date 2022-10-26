import { Button, Grid, Link, TextField, Typography, Card, CardContent  } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import React, { useRef } from "react"
import "./login.css" 
import { useCookies } from "react-cookie"

const Verify = (props) => {
    const paperStyle={width: '17em', padding: 20}
    const textFieldStyle={marginTop: '1em'}
    const signupButtonStyle = {marginTop: '1.4em'}
    const sendCodeAgainStyle = {paddingTop: '1.4em'}

    const codeRef = useRef('codeRef')

    const [cookies] = useCookies(["user"]);

    const enterCode = async () => {
        const response = await fetch('http://localhost:8080/api/auth/verify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codeRef.current.value,
                email: cookies.email
            })
        })
        if (response.status === 200) {
            props.enter()
        } else {
            props.reopenverify(200, '', cookies.email, 'Code is incorrect')
        }
    }

    return (
        <Grid>
            <Card elevation={10} style={paperStyle}>
                <CardContent>
                    <Typography>
                        Enter the code that has been sent to your email.
                    </Typography>
                    <TextField style={textFieldStyle} id="code" inputRef={codeRef} label="Code" variant="outlined" placeholder="Code" fullWidth required />
                    <Button onClick={enterCode} style={signupButtonStyle} variant="contained" type="submit" color="primary" fullWidth>Enter</Button>
                    <Grid style={sendCodeAgainStyle} container direction="row" justifyContent="flex-start" alignItems="center">
                        <Typography display="inline">
                            <Link>Send code again</Link>
                        </Typography>
                    </Grid>
                    {props.errorMessage !== '' &&
                        <CardContent>
                            <Alert severity="error">{props.errorMessage}</Alert>
                        </CardContent>
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Verify