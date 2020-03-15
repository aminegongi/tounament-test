import css from './club-profile.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect, Fragment } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PrintButton = dynamic(() => import('../printPage/PrintButton'), { ssr: false });
const Page = dynamic(() => import('../printPage/Page'), { ssr: false });



export default function ({ router }) {
    const [pdfClicked, setPdfClicked] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPdfClicked(false)
        }, 200);
    }, [pdfClicked])
    return (
        <div className={css.clubProfileContainer}>

            <Link href='/'>
                <div className={css.goBack}>
                    <img src='/baseline_arrow_right_alt_black_18dp.png' alt='' /> <span>Retour au site web</span>
                </div>
            </Link>
            <Page id={router.query.id} singleMode>
                <div className={css.body}>
                    <div className={css.logo}>
                        <img src='/espaceClub.svg' alt='' />
                        <div className={css.creationDateWithImg}>
                            PROFIL CRÉÉ LE 10 DÉCEMBRE 2019
                    </div>
                    </div>
                    <div className={css.downloadSection}>
                        {
                            !pdfClicked && <Fragment>
                                <PrintButton id={router.query.id} label={"Sauvegarder le PDF"} className={globalCss.global_primary_button} onClick={setPdfClicked} />
                                <CopyToClipboard text={"https://isporit.com" + router.asPath}
                                    onCopy={() => console.log("copied")}>
                                    <button className={globalCss.global_primary_button}>
                                        Copier le lien
                                    </button>
                                </CopyToClipboard>

                            </Fragment>
                        }
                    </div>
                    <div className={css.underLogo}>
                        <h1 className={css.profileName}>
                            Tennis club avenir sportif de la marsa
                        </h1>
                        <div className={css.email}>
                            horizon2019@asgammarth.com
                        </div>
                    </div>
                    <div className={css.creationDate}>
                        PROFIL CRÉÉ LE 10 DÉCEMBRE 2019
                    </div>

                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Association :
                        </div>
                        <div className={css.value}>
                            Association sportive de la marsa
                        </div>
                    </div>

                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Creation date :
                        </div>
                        <div className={css.value}>
                            September 2015
                        </div>
                    </div>

                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Numero :
                        </div>
                        <div className={css.value}>
                            +216 28 123 145
                        </div>
                    </div>

                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Social media :
                        </div>
                        <div className={css.value}>
                            <img src='/facebook.svg' alt="facebook" />
                            <img src='/Instagram_logo.png' alt="instagram" />
                        </div>
                    </div>

                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Address :
                        </div>
                        <div className={css.value}>
                            Football place , la marsa Tunisie
                        </div>
                    </div>


                    <div className={css.withLabel}>
                        <div className={css.label}>
                            Sport :
                        </div>
                        <div className={css.value}>
                            Football
                        </div>
                    </div>
                </div>
                <div className={css.footer}>
                    <span>Powered by</span> <img src='/logo.png' alt='logo' />
                </div>
            </Page>

        </div>
    )
}