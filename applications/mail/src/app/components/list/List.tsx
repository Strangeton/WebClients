import React, { useState } from 'react';
import { useLabels } from 'react-components';

import Item from './Item';
import { Element } from '../../models/element';

interface Props {
    labelID: string;
    elementID?: string;
    mailSettings: any;
    elements?: Element[];
    checkedIDs?: string[];
    onCheck: Function;
    onClick: Function;
}

const List = ({ labelID, elementID, mailSettings = {}, elements = [], checkedIDs = [], onCheck, onClick }: Props) => {
    const [labels] = useLabels();
    const [lastChecked, setLastChecked] = useState(); // Store ID of the last contact ID checked

    const handleCheck = (elementID: string) => (event: React.MouseEvent) => {
        const target = event.target as HTMLInputElement;
        const { shiftKey } = event.nativeEvent;
        const elementIDs = [elementID];

        if (lastChecked && shiftKey) {
            const start = elements.findIndex(({ ID }) => ID === elementID);
            const end = elements.findIndex(({ ID }) => ID === lastChecked);
            elementIDs.push(
                ...elements.slice(Math.min(start, end), Math.max(start, end) + 1).map(({ ID }) => ID || '')
            );
        }

        setLastChecked(elementID);
        onCheck(elementIDs, target.checked);
    };

    return (
        <>
            {elements.map((element) => {
                return (
                    <Item
                        labels={labels}
                        labelID={labelID}
                        key={element.ID}
                        elementID={elementID}
                        element={element}
                        checked={checkedIDs.includes(element.ID || '')}
                        onCheck={handleCheck(element.ID || '')}
                        onClick={onClick}
                        mailSettings={mailSettings}
                    />
                );
            })}
        </>
    );
};

export default List;
