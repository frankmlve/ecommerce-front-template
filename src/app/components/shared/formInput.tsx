import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons"
import React, {useState} from "react";
import styles from '../../styles/form-input.module.scss';
import Button from "@/app/components/shared/button";
export default function FormInput({type,
                                      label,
                                      placeHolder,
                                      name,
                                      showButton= false,
                                      onChange}){
    const [inputType, setInputType] = useState(type)
    const handleClick = (event) => {
        event.preventDefault()
        inputType == 'password' ? setInputType('text') : setInputType('password')
    }
    return (
        <div className={styles.formInputContainer}>
            <label htmlFor={name} className='form-label'>{label}</label>
            <div className='input-group'>
                <input type={inputType}
                       placeholder={placeHolder}
                       name={name}
                       onChange={onChange}
                aria-describedby='button-addon1'
                id={name}
                className='form-control'/>
                {showButton ? <Button className="btn btn-light" id="button-addon1" onClick={handleClick} type={'button'} value={
                    <FontAwesomeIcon icon={faEye} style={{fontSize: '1rem'}}></FontAwesomeIcon>
                }>
                </Button> : null}
            </div>
        </div>
    )
}
