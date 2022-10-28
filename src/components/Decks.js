import { Typography, Card } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import "./login.css" 
import axios from 'axios'
import { useCookies } from "react-cookie"

const Decks = () => {

    const [cookies] = useCookies(["user"]);
    const [decks, setDecks] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/decks', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.jwtToken
                }
        }).then(res => {
            var decksData = res.data.map((deck) => {
                return (
                    <Card key={deck.id}>
                        <Typography variant="h4">
                            {deck.name}
                        </Typography>
                    </Card>
                )
            })
            setDecks(decksData)
        })
    })

    
    return (
        <div>
            {decks.length > 0 && 
                decks
            }
        </div>
    )
}

export default Decks;