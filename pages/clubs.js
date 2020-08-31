import Layout from '../shared/components/layout/Layout'
import Head from 'next/head'
import css from '../shared/css/clubs.scss'
import { Input, Button } from 'antd'
import { CITIES } from '../utils/fakeData'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMediaPredicate } from "react-media-hook";
import routes from '../utils/routes'

const Card = ({ el }) => {
    const [image, setImage] = useState(el.logo || 'logo-192.png')
    return (
        <Link href={routes.CLUB_WEBSITE.linkTo(el.slug)} >
            <div className={css.club_card}>
                <div className={css.image_container}>
                    <img width="198px" src={image} onError={() => setImage('logo-192.png')} alt={el.title} />
                </div>
                <div className={css.club_card_body}>
                    <div className={css.title}>
                        {el.title}
                    </div>
                    <div className={css.description}>
                        {el.website.introduction && el.website.introduction.body && (el.website.introduction.body.description.slice(0, 310) + "...")}
                    </div>
                    <div className={css.footer}>
                        <div className={css.address}>
                            {el.address}
                        </div>
                        <button>
                            voir club
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export function Clubs({ data, status }) {

    const isMobile = useMediaPredicate("(max-width: 992px)");


    const [mobileExtraSearchOptions, setMobileExtraSearchOptions] = useState(false)
    const [clubs, setClubs] = useState(data)
    const [searchOption, setSearchOption] = useState({
        clubName: '',
        city: '',
        sport: '',
    })

    useEffect(() => {
        const result = data.filter(el => el.title.toLocaleLowerCase().includes(searchOption.clubName.toLocaleLowerCase()) && el.city.toLocaleLowerCase().includes(searchOption.city.toLocaleLowerCase()) && el.website.introduction.body.sport.toLocaleLowerCase().includes(searchOption.sport.toLocaleLowerCase()))
        setClubs(result)
    }, [searchOption])

    const renderExtraSearchOptions = () => {
        if (isMobile && mobileExtraSearchOptions) {
            return (
                <>
                    <div className={css.select_container}>
                        <label htmlFor="pays">Pays</label>
                        <select id="pays" disabled >
                            <option value="">
                                Tunisia
                        </option>
                        </select>
                    </div>
                    <div className={css.select_container}>
                        <label htmlFor="ville">Ville</label>
                        {/* style={{ border: 'unset', borderBottom: '1px solid red' }}  */}
                        <select onChange={e => setSearchOption({ ...searchOption, city: e.target.value })} value={searchOption.city} id="ville" >
                            <option value="">
                                sélectionner
                        </option>
                            {
                                CITIES.map(el => (
                                    <option key={el} value={el}>
                                        {el}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={css.select_container}>
                        <label htmlFor="sport">Sport</label>
                        {/* style={{ border: 'unset', borderBottom: '1px solid red' }}  */}
                        <select onChange={e => setSearchOption({ ...searchOption, sport: e.target.value })} value={searchOption.sport} id="sport" >
                            <option value="">
                                sélectionner
                        </option>
                            <option value="tennis">
                                Tennis
                        </option>
                            <option value="football">
                                Football
                        </option>
                        </select>
                    </div>
                </>
            )
        }
        if (!isMobile) {
            return (
                <>
                    <div className={css.select_container}>
                        <label htmlFor="pays">Pays</label>
                        <select id="pays" disabled >
                            <option value="">
                                Tunisia
                            </option>
                        </select>
                    </div>
                    <div className={css.select_container}>
                        <label htmlFor="ville">Ville</label>
                        {/* style={{ border: 'unset', borderBottom: '1px solid red' }}  */}
                        <select onChange={e => setSearchOption({ ...searchOption, city: e.target.value })} value={searchOption.city} id="ville" >
                            <option value="">
                                sélectionner
                            </option>
                            {
                                CITIES.map(el => (
                                    <option key={el} value={el}>
                                        {el}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={css.select_container}>
                        <label htmlFor="sport">Sport</label>
                        {/* style={{ border: 'unset', borderBottom: '1px solid red' }}  */}
                        <select onChange={e => setSearchOption({ ...searchOption, sport: e.target.value })} value={searchOption.sport} id="sport" >
                            <option value="">
                                sélectionner
                            </option>
                            <option value="tennis">
                                Tennis
                            </option>
                            <option value="football">
                                Football
                            </option>
                        </select>
                    </div>
                </>
            )
        }
    }


    return (
        <>
            <Head>
                <title>Rechercher un club</title>

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Rechercher un club" />
                <meta name="keywords" content="sport,clubs,recherche,tennis,football..." />
                <meta name="author" content="iSporit" />

            </Head>
            <Layout>
                <div className={css.clubs}>
                    <div className={css.search_section}>
                        <div className={css.input_container}>
                            <label htmlFor="clubName">Rechercher un club</label>
                            <Input onChange={e => setSearchOption({ ...searchOption, clubName: e.target.value })} value={searchOption.clubName} type="text" id="clubName" placeholder="club" />
                        </div>
                        {
                            renderExtraSearchOptions()
                        }
                        {
                            isMobile && !mobileExtraSearchOptions && <Button onClick={() => setMobileExtraSearchOptions(true)} >Recherche Avancée</Button>
                        }
                    </div>

                    <div className={css.result_section}>
                        <div className={css.title}>
                            Résultat ({clubs.length} clubs)
                        </div>
                        <div className={css.clubs_cards}>
                            {
                                clubs.filter(el => el.public).map(el => {
                                    return (
                                        <Card key={el._id} el={el} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )

}


Clubs.getInitialProps = async (ctx) => {
    const res = await fetch("https://test.isporit.com/api/Clubs/all?hasWebsite=true")
    const json = await res.json()
    const data = () => {
        if (json) {
            return json.filter(el => el.public)
        }
        return []
    }
    return { status: 200, data: data() }

}

export default Clubs