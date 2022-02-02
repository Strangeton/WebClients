import { c } from 'ttag';
import { classnames } from '../../helpers/component';
import { Button, Card, Href, Icon } from '../../components';
import { SettingsSectionTitle } from '../account';
import ReactivateKeysButton from '../keys/reactivateKeys/ReactivateKeysButton';

interface Props {
    onDismiss: () => void;
    className?: string;
}

const RecoverDataCard = ({ onDismiss, className }: Props) => {
    return (
        <Card rounded background={false} className={classnames(['max-w52e p2', className])}>
            <SettingsSectionTitle className="h3 flex flex-align-items-center flex-nowrap">
                <Icon className="flex-item-noshrink color-danger" name="circle-exclamation-filled" size={18} />
                <span className="ml0-5">{c('Title').t`Data locked`}</span>
            </SettingsSectionTitle>
            <p>{c('Info').t`It appears some of your data is encrypted and locked.`}</p>
            <ul>
                <li>
                    {c('Info')
                        .t`If you recently reset your password, you can use a data recovery method to unlock your data`}
                </li>
                <li>
                    {c('Info').t`If this is due to an old password reset, you can stop the message from showing again`}
                </li>
            </ul>

            <p>
                <Href url="https://protonmail.com/support/knowledge-base/recover-encrypted-messages-files">
                    {c('Link').t`How to unlock data`}
                </Href>
            </p>

            <ReactivateKeysButton className="mr1">{c('Action').t`Unlock data`}</ReactivateKeysButton>

            <Button onClick={onDismiss}>{c('Action').t`Don't show again`}</Button>
        </Card>
    );
};

export default RecoverDataCard;
