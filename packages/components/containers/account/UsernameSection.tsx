import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { c } from 'ttag';

import { ButtonLike, Card, CircleLoader, Href } from '@proton/atoms';
import { getAppHref } from '@proton/shared/lib/apps/helper';
import { stripLocalBasenameFromPathname } from '@proton/shared/lib/authentication/pathnameHelper';
import {
    APPS,
    APP_NAMES,
    BRAND_NAME,
    CALENDAR_SHORT_APP_NAME,
    MAIL_APP_NAME,
    MAIL_SHORT_APP_NAME,
    SETUP_ADDRESS_PATH,
    SSO_PATHS,
} from '@proton/shared/lib/constants';
import { getIsAddressEnabled } from '@proton/shared/lib/helpers/address';
import { stripLeadingAndTrailingSlash } from '@proton/shared/lib/helpers/string';
import { getKnowledgeBaseUrl } from '@proton/shared/lib/helpers/url';
import { Address, UserType } from '@proton/shared/lib/interfaces';

import { AppLink, InlineLinkButton, useModalState } from '../../components';
import { useAddresses, useConfig, useUser } from '../../hooks';
import EditDisplayNameModal from './EditDisplayNameModal';
import SettingsLayout from './SettingsLayout';
import SettingsLayoutLeft from './SettingsLayoutLeft';
import SettingsLayoutRight from './SettingsLayoutRight';
import SettingsSection from './SettingsSection';

interface Props {
    app: APP_NAMES;
}

const UsernameSection = ({ app }: Props) => {
    const { APP_NAME } = useConfig();
    const [user] = useUser();
    const location = useLocation();
    const [addresses, loadingAddresses] = useAddresses();
    const [tmpAddress, setTmpAddress] = useState<Address>();
    const [modalProps, setModalOpen, renderModal] = useModalState();

    const primaryAddress = addresses?.find(getIsAddressEnabled);

    const BRAND_NAME_TWO = BRAND_NAME;

    const fromPath = `/${stripLeadingAndTrailingSlash(stripLocalBasenameFromPathname(location.pathname))}`;

    return (
        <>
            {renderModal && tmpAddress && <EditDisplayNameModal {...modalProps} address={tmpAddress} />}
            <SettingsSection>
                {user.Type === UserType.EXTERNAL && primaryAddress && APP_NAME === APPS.PROTONACCOUNT && (
                    <Card className="mb-8" rounded bordered={false}>
                        <div className="mb-2">
                            {c('Info')
                                .t`Get a ${BRAND_NAME} address to use all ${BRAND_NAME_TWO} services including ${MAIL_SHORT_APP_NAME} and ${CALENDAR_SHORT_APP_NAME}.`}{' '}
                            <Href href={getKnowledgeBaseUrl('/external-accounts')}>{c('Link').t`Learn more`}</Href>
                        </div>
                        <ButtonLike
                            as={AppLink}
                            toApp={APPS.PROTONACCOUNT}
                            to={`${SETUP_ADDRESS_PATH}?to=${APPS.PROTONMAIL}&from=${app}&from-type=settings&from-path=${fromPath}`}
                            color="norm"
                        >
                            {c('Info').t`Get my ${BRAND_NAME} address`}
                        </ButtonLike>
                    </Card>
                )}
                <SettingsLayout>
                    <SettingsLayoutLeft>
                        <div className="text-semibold">{c('Label').t`Username`}</div>
                    </SettingsLayoutLeft>
                    <SettingsLayoutRight className="pt-2">
                        {user.Type === UserType.EXTERNAL && primaryAddress ? primaryAddress.Email : user.Name}
                    </SettingsLayoutRight>
                </SettingsLayout>
                {(primaryAddress || loadingAddresses) && (
                    <SettingsLayout>
                        <SettingsLayoutLeft>
                            <div className="text-semibold">{c('Label').t`Display name`}</div>
                        </SettingsLayoutLeft>
                        <SettingsLayoutRight className="pt-2">
                            {!primaryAddress || loadingAddresses ? (
                                <div className="flex flex-nowrap">
                                    <CircleLoader />
                                </div>
                            ) : (
                                <div className="flex flex-nowrap">
                                    <div className="text-ellipsis user-select mr-2">{primaryAddress.DisplayName}</div>
                                    <InlineLinkButton
                                        onClick={() => {
                                            setTmpAddress(primaryAddress);
                                            setModalOpen(true);
                                        }}
                                        aria-label={c('Action').t`Edit display name`}
                                    >
                                        {c('Action').t`Edit`}
                                    </InlineLinkButton>
                                </div>
                            )}
                        </SettingsLayoutRight>
                    </SettingsLayout>
                )}
                {APP_NAME === APPS.PROTONVPN_SETTINGS && user.Type === UserType.PROTON && (
                    <SettingsLayout>
                        <SettingsLayoutLeft>
                            <div className="text-semibold">{c('Label').t`${MAIL_APP_NAME} address`}</div>
                        </SettingsLayoutLeft>
                        <SettingsLayoutRight className="pt-2">
                            {loadingAddresses ? (
                                <div className="flex flex-nowrap">
                                    <CircleLoader />
                                </div>
                            ) : primaryAddress?.Email ? (
                                <div className="text-pre-wrap break user-select">{primaryAddress.Email}</div>
                            ) : (
                                <Href
                                    href={`${getAppHref(SSO_PATHS.SWITCH, APPS.PROTONACCOUNT)}?product=mail`}
                                    title={c('Info').t`Sign in to ${MAIL_APP_NAME} to activate your address`}
                                >
                                    {c('Link').t`Not activated`}
                                </Href>
                            )}
                        </SettingsLayoutRight>
                    </SettingsLayout>
                )}
            </SettingsSection>
        </>
    );
};

export default UsernameSection;
