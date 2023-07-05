'use client';
import FormInput from "@/app/components/shared/formInput";
import Button from "@/app/components/shared/button";
import React from "react";
import styles from '../styles/login-form.module.scss'

export default function LoginForm({handleSubmit, setUser, setPassword}) {

    const handleChange = event => {
        switch (event.target.name){
            case 'user':
                setUser(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
        }
    }
    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <FormInput type={'text'}
                       label={'Usuario'}
                       placeHolder={'Ingrese su nombre de usuario'}
                       name={'user'}
                       onChange={handleChange}/>
            <FormInput type={'password'} l
                       label={'Contrasena'}
                       placeHolder={'Ingrese su contrasena'}
                       name={'password'}
                       onChange={handleChange}
            showButton={true}/>
            <Button type={'submit'} value={'Iniciar Sesion'}
            className={'btn btn-light'}/>
        </form>
    )
}
