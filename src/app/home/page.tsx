'use client'
import { useEffect } from "react";
import Carousel from "../components/carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/home-page.module.scss';

export default function Page(){
    useEffect(() => {
        import('bootstrap');
    }, [])
    return (
        <div className={styles.mainContainer}>
            <div className={"container-xxl" }>
                <Carousel/>
            </div>
        </div>
    )
}
