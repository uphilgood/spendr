import React, { useMemo } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { CardActionArea } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 200,
        maxHeight: 200
    },
    media: {
        minHeight: 100,
        minWidth: 200,
        paddingTop: "56.25%" // 16:9
    },
}));

const imageMapper = {
    'Bank of America': 'https://www2.bac-assets.com/credit-cards/spa-assets/images/assets-images-site-credit-cards-category-choices-cash-rewards-card-CSX7076cc8e.png',
    'Chase': 'https://creditcards.chase.com/K-Marketplace/images/cardart/sapphire_preferred_card.png',
    'Wells Fargo': 'https://www01.wellsfargomedia.com/assets/images/informational-graphics/screenshots-thumbnails/mobile/WellsFargo-Card_147x91.png',
    'Citi': 'https://www.citibank.ru/russia/citione/images/cards/citioneplus.png',
    'US Bank': 'https://www.usbank.com/content/dam/usbank/images/debit-card-designs/debit-800x514-contactless.png',
    'Capital One': 'https://nmgprod.s3.amazonaws.com/media/files/8e/52/8e528ed3cd0fb11f928314feee9c375a/cover_image.png.640x360_q85_crop.png',
    'PNC': 'https://www.pnc.com/content/dam/pnc-com/images/corporateandinstitutional/commercial_cards/credit_card_commercial_rewards.png',
    'USAA': 'https://content.usaa.com/mcontent/static_assets/Media/bank-featurette-visa-rate-advantage-card-retina-2x.png?cacheid=3935163833_p',
    'American Express': 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/gold-card.png',
    'TD Bank': 'https://www.td.com/us/en/personal-banking/images/credit_card_cash_27-1_tcm371-259473.jpg',
    'Suntrust': 'https://www.suntrust.com/content/dam/suntrust/us/en/shared/2019/card-art/radial-light-front-business-debit-572x360.png',
    'Regions': 'https://www.regions.com/personal-banking/-/media/Images/DotCom/Products/cc-consumer-checkcard.png?revision=84572c6a-c13b-4147-9e66-ab5dcdc1c8c2',
    'Navy Federal': 'https://www.moneycrashers.com/wp-content/uploads/2018/04/navy-federal-credit-union-go-rewards-card.jpg',
    'BB&T': 'https://dakq2d9inx89d.cloudfront.net/wp-content/uploads/2019/11/12183809/bbt-card-art.png',
    'Charles Schwab': 'https://res.cloudinary.com/dipmwqfxq/w_275,h_275,c_fit,f_auto,q_99/cci/2019/05/card-visa.png',
    'Fidelity': 'https://www.thestreet.com/.image/t_share/MTY4NjM5MjQ4NjY4NTAxNjM5/amex-loses-fidelity-as-branded-credit-card-rivalry-heats-up.jpg',
    'Citizens Bank': 'https://www.citizensbank.com/assets/CB_media/images/citizens-bank-live/DebitCardDesign.png',
    'Huntington': 'https://www.huntington.com/-/media/Dot_Com_Redesign/DOT-COM-ILLUSTRATIONS--IMAGES-FOR-REDESIGN/HNB-Affinity-Cards/affinity-card-cleveland-state-alt.jpg?rev=1fb2d0bab72d49dcbe9cf4b4dce43489&h=173&w=275&la=en&hash=9542606362CB7F3E07C1D913879E6FB7',
}


const CardImageRenderer = ({ accounts, onClick }) => {

    console.log('rerendered')

    const classes = useStyles();

    const Cards = ({ accounts }) => (
        accounts.map(account => {
            const getImage = useMemo(institutionName => imageMapper[account.institutionName], [accounts]);
            return (
                <div style={{ display: 'grid' }}>
                    <Card className={classes.root} style={{ marginRight: '16px' }}>
                        <CardActionArea onClick={() => onClick(account.institutionName)}>
                            <CardMedia
                                className={classes.media}
                                image={getImage}
                                title={account.institutionName}
                            />
                        </CardActionArea>
                    </Card>
                </div>
            )
        })
    )

    return (
        <div style={{ width: '100%' }}>
            <Box display="flex">
                <Cards accounts={accounts} />
            </Box>
        </div>
    )
}

export default CardImageRenderer;