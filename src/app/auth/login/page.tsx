'use client';
import LoginForm from "@/app/components/login";
import React, {useEffect} from "react";
import {login} from "@/app/services/login-service";
import styles from '../../styles/login-page.module.scss'
import {redirect, useRouter} from "next/navigation";

export default function Page(){
    const [user, setUser] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [haveError, itHaveError] = React.useState(false)
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('auth_token')){
            router.push('/home')
        }
    })
    const handleSubmit = (event: any) => {
        event.preventDefault();
        login(user, password).then(({data}) => {
            console.log(data)
            localStorage.setItem('auth_token', data.jwt)
            router.push('/home')
        }, error => {
            console.error(error.response)
            itHaveError(true)
            setErrorMessage(error.response.data.error.message)
        })
    }
    return (
        <div className={styles.loginPageForm}>
            <LoginForm handleSubmit={handleSubmit}
                       setUser={setUser}
                       setPassword={setPassword}></LoginForm>
            {haveError ? <span>{errorMessage}</span> : null}
        </div>
    )
}
