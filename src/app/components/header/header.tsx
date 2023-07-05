import styles from '../../styles/Header.module.scss'
import Image from "next/image";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { getLogoData } from '@/app/services/banners-service';


const HeaderComponent =  ({pathname}) => {
    const baseApiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL
    const [data, setData] = React.useState();
    
    useEffect(() => {
        let ignore = false;
        getLogoData().then(({data} )=> {
            console.log(data)
            setData(data.data)
        })
        return () => {
            ignore = true;
          };
    }, [])
    const createImgUrl = ((imgPath: string) => {
        return baseApiUrl + imgPath
    })
    const navLinks = [
        {
            value:'/auth/login',
            label: 'Iniciar Sesion',
            key: 0
        },
        {
            value:'#',
            label: 'Contactanos',
            key: 1
        }
    ]
    return (
        <div className={styles.headerBackground}>
            <div>
                {data ? <Image src={createImgUrl(data.attributes.logo.data.attributes.url)}
                       alt={data.attributes.texto_alternativo}
                width={200}
                height={100}/> : null }

            </div>
            <div className={styles.navButtonContainer}>
                <ul className={'nav nav-underline'}>
                    {navLinks.map((link) =>
                        <li className={'nav-item'} key={link.key}>
                            <Link href={link.value} className={'nav-link ' + ( pathname === link.value ? 'active' : '')}>{link.label}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default HeaderComponent
