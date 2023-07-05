import styles from '../../styles/button.module.scss'
import {useEffect} from "react";
export default function Button({value, type, onClick, className = 'btn btn-outline-primary'}){
    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [])
    return (
        <button type={type}
                value={value}
                onClick={onClick}
        className={className}>
            {value}
        </button>
    )
}
