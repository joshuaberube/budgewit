import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from "react-plaid-link"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { getTransactions } from '../../redux/slices/plaidSlice'
import { selectIsLoggedIn } from '../../redux/slices/userSlice'

const PlaidBankLink = () => {
    const [token, setToken] = useState("")
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const onSuccess = useCallback(async publicToken => {
        await axios.post("/api/plaid/create-access-token", { publicToken })
        .catch(err => console.log(err))
    }, [])

    const onEvent = useCallback(eventName => {
        if (eventName === "HANDOFF") dispatch(getTransactions())
    }, [dispatch])

    const config = { token, onSuccess, onEvent }

    const { open, ready, error } = usePlaidLink(config)

    useEffect(() => {
        const createToken = async () => {
            const response = await axios.post("/api/plaid/create-link-token")
            .catch(err => console.log(err))

            setToken(response.data)
        }

        if (isLoggedIn) createToken()
    }, [isLoggedIn])

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