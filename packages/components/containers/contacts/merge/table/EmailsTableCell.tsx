import clsx from '@proton/utils/clsx';

interface Props {
    emails: string[];
    contactID: string;
    highlightedID: string;
    greyedOut: boolean;
}

const EmailsTableCell = ({ contactID, emails = [], highlightedID, greyedOut }: Props) => {
    return (
        <div
            className={clsx([
                'flex',
                'flex-align-items-center',
                'max-w100',
                greyedOut && 'color-weak',
                contactID === highlightedID && 'text-bold',
            ])}
        >
            <span className="inline-block text-ellipsis">{emails.map((email) => `<${email}>`).join(', ')}</span>
        </div>
    );
};

export default EmailsTableCell;
