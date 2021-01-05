import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from "react-plaid-link"
import { useDispatch } from 'react-redux'
import axios from "axios"
import { getTransactions } from '../../redux/slices/plaidSlice'

const PlaidBankLink = () => {
    const [token, setToken] = useState("")
    const dispatch = useDispatch()

    const onSuccess = useCallback(async publicToken => {
        await axios.post("/api/plaid/create-access-token", { publicToken })
        .catch(err => console.log(err))

    }, [])

    const onEvent = useCallback(eventName => {
        if (eventName === "HANDOFF") dispatch(getTransactions())
    }, [dispatch])

    // const onExit = useCallback((err, metadata) => {
    //     console.log("onExit", err, metadata)
    // }, [])

    const config = { token, onSuccess, onEvent }

    const { open, ready, error } = usePlaidLink(config)

    useEffect(() => {
        const createToken = async () => {
            try {
                const response = await axios.post("/api/plaid/create-link-token")
                setToken(response.data)
            } catch (err) {
                console.log(err)
            } 
        }
        createToken()
    }, [])

    return (
        <input 
            type="button" 
            onClick={open} 
            disabled={!ready || error} 
            value="Connect a bank account"
        />
    )
}

export default PlaidBankLink