import Head from "next/head";
import fetch from 'isomorphic-unfetch'
import css from '../../shared/css/clubWebsite.scss'
import Introduction from '../../shared/components/Website/Introduction/index'
import Details from '../../shared/components/Website/Details/index'
import Staff from '../../shared/components/Website/Staff/index'
import Price from '../../shared/components/Website/Price/index'
import globalCss from '../../shared/global-style.scss'




const clubWebsite = ({ status, data, clubName }) => {
    console.log('club: ', clubName);
    console.log('props: ', data);



    if (status === 401) {
        return (
            <div className={"css.clubWebsite"}>
                unauthorized
            </div>
        )
    }

    if (status === 404) {
        return (
            <div className={"css.clubWebsite"}>
                not found
            </div>
        )
    }

    if (status === 200) {
        return (
            <div className={css.clubWebsite}>
                <Head>
                    <title>{clubName}</title>

                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={data.introduction.body.title} />
                    <meta name="keywords" content={`${clubName} , sport, clubs, ${data.introduction.body.sport}, ${data.partners.body.map(el => el.name + ", ")}`} />
                    <meta name="author" content="iSporit" />

                </Head>
                <div className={css.clubWebsite__body}>
                    <Introduction data={data.introduction} />
                    <Details data={data.details} />
                    <Staff data={data.staff} />
                    <Price data={data.prices} />

                </div>
            </div>
        )
    }
}

clubWebsite.getInitialProps = async (ctx) => {
    const res = await fetch("https://dev.api.isporit.com/Clubs/slug/" + ctx.query.id)
    const json = await res.json()
    if (json.website) {
        return { status: 200, data: json.website, clubName: json.title }
    }
    // if (json.website && json.website.isPublished) {
    //     return { status: 200, data: json.website }
    // }
    // if (json.website && !json.website.isPublished) {
    //     return { status: 401, data: json.website }
    // }
    if (json.message === "clubNotFound") {
        return { status: 404, data: json }
    }
    return { status: 500, data: json }

}


export default clubWebsite