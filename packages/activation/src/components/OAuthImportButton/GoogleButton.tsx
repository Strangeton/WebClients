import { c } from 'ttag';

import { Button } from '@proton/atoms';
import googleLogo from '@proton/styles/assets/img/import/providers/google.svg';
import clsx from '@proton/utils/clsx';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick: () => void;
}

const GoogleButton = ({ className, disabled, onClick }: Props) => {
    return (
        <Button
            className={clsx(['inline-flex flex-justify-center', className])}
            disabled={disabled}
            onClick={onClick}
            data-testid="OAuthImportButton:button"
        >
            <img src={googleLogo} className="mr-2 flex-align-self-center" alt="" />
            {c('Action').t`Continue with Google`}
        </Button>
    );
};

export default GoogleButton;
