import { c } from 'ttag';

import { isCyberWeekPeriod, isEndOfYearPeriod } from '../../helpers/offerPeriods';
import OfferTitle from '../shared/OfferTitle';

const BlackFridayTitle = () => {
    if (isCyberWeekPeriod()) {
        return <OfferTitle>{c('specialOffer: Title').t`Cyber Week Sale`}</OfferTitle>;
    }

    if (isEndOfYearPeriod()) {
        return <OfferTitle>{c('specialOffer: Title').t`End of Year Sale`}</OfferTitle>;
    }

    return <OfferTitle>{c('specialOffer: Title').t`Black Friday Sale`}</OfferTitle>;
};

export default BlackFridayTitle;
