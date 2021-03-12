import  './club-profile.scss'
import  '../../global-style.scss'
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
        <div className={"clubProfileContainer"}>

            <Link href='/'>
                <div className={"goBack"}>
                    <img src='/baseline_arrow_right_alt_black_18dp.png' alt='' /> <span>Retour au site web</span>
                </div>
            </Link>
            <Page id={router.query.id} singleMode>
                <div className={"body"}>
                    <div className={"logo"}>
                        <img src='/espaceClub.svg' alt='' />
                        <div className={"creationDateWithImg"}>
                            PROFIL CRÉÉ LE 10 DÉCEMBRE 2019
                    </div>
                    </div>
                    <div className={"downloadSection"}>
                        {
                            !pdfClicked && <Fragment>
                                <PrintButton id={router.query.id} label={"Sauvegarder le PDF"} className={"global_primary_button"} onClick={setPdfClicked} />
                                <CopyToClipboard text={"https://isporit.com" + router.asPath}
                                    onCopy={() => console.log("copied")}>
                                    <button className={"global_primary_button"}>
                                        Copier le lien
                                    </button>
                                </CopyToClipboard>

                            </Fragment>
                        }
                    </div>
                    <div className={"underLogo"}>
                        <h1 className={"profileName"}>
                            Tennis club avenir sportif de la marsa
                        </h1>
                        <div className={"email"}>
                            horizon2019@asgammarth.com
                        </div>
                    </div>
                    <div className={"creationDate"}>
                        PROFIL CRÉÉ LE 10 DÉCEMBRE 2019
                    </div>

                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Association :
                        </div>
                        <div className={"value"}>
                            Association sportive de la marsa
                        </div>
                    </div>

                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Creation date :
                        </div>
                        <div className={"value"}>
                            September 2015
                        </div>
                    </div>

                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Numero :
                        </div>
                        <div className={"value"}>
                            +216 28 123 145
                        </div>
                    </div>

                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Social media :
                        </div>
                        <div className={"value"}>
                            <img src='/facebook.svg' alt="facebook" />
                            <img src='/Instagram_logo.png' alt="instagram" />
                        </div>
                    </div>

                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Address :
                        </div>
                        <div className={"value"}>
                            Football place , la marsa Tunisie
                        </div>
                    </div>


                    <div className={"withLabel"}>
                        <div className={"label"}>
                            Sport :
                        </div>
                        <div className={"value"}>
                            Football
                        </div>
                    </div>
                </div>
                <div className={"footer"}>
                    <span>Powered by</span> <img src='/logo.png' alt='logo' />
                </div>
            </Page>

        </div>
    )
}