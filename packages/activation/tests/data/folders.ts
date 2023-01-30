import { FolderMapItem } from '@proton/activation/components/Modals/CustomizeMailImportModal/CustomizeMailImportModal.interface';

export const systemFolders = [
    {
        id: 'INBOX',
        providerPath: ['INBOX'],
        checked: true,
        color: '#DB60D6',
        systemFolder: 'Inbox',
        isSystemFolderChild: false,
        folderChildIDS: [],
        protonPath: ['INBOX'],
        separator: '/',
        size: 0,
    },
    {
        id: 'Sent',
        providerPath: ['Sent'],
        checked: true,
        color: '#0A77A6',
        systemFolder: 'Sent',
        isSystemFolderChild: false,
        folderChildIDS: [],
        protonPath: ['Sent'],
        separator: '/',
        size: 1545215,
    },
    {
        id: 'Drafts',
        providerPath: ['Drafts'],
        checked: true,
        color: '#C44800',
        systemFolder: 'Drafts',
        isSystemFolderChild: false,
        folderChildIDS: [],
        protonPath: ['Drafts'],
        separator: '/',
        size: 0,
    },
];

export const folderWithChildren: FolderMapItem[] = [
    {
        id: 'parent folder',
        providerPath: ['parent folder'],
        checked: true,
        color: '#0A77A6',
        isSystemFolderChild: false,
        folderChildIDS: [
            'parent folder/first child',
            'parent folder/first child/another sub child',
            'parent folder/first child/sub child',
            'parent folder/second child',
        ],
        protonPath: ['parent folder'],
        separator: '/',
        size: 0,
        disabled: false,
        errors: [],
        isLabel: false,
        category: undefined,
        systemFolder: undefined,
        folderParentID: undefined,
    },
    {
        id: 'parent folder/first child',
        providerPath: ['parent folder', 'first child'],
        checked: true,
        color: '#0A77A6',
        isSystemFolderChild: false,
        folderChildIDS: ['parent folder/first child/another sub child', 'parent folder/first child/sub child'],
        folderParentID: 'parent folder',
        protonPath: ['parent folder', 'first child'],
        separator: '/',
        size: 0,
        disabled: false,
        errors: [],
        isLabel: false,
        category: undefined,
        systemFolder: undefined,
    },
    {
        id: 'parent folder/first child/another sub child',
        providerPath: ['parent folder', 'first child', 'another sub child'],
        checked: true,
        color: '#0A77A6',
        isSystemFolderChild: false,
        folderChildIDS: [],
        folderParentID: 'parent folder/first child',
        protonPath: ['parent folder', 'first child', 'another sub child'],
        separator: '/',
        size: 0,
        disabled: false,
        errors: [],
        isLabel: false,
        category: undefined,
        systemFolder: undefined,
    },
    {
        id: 'parent folder/first child/sub child',
        providerPath: ['parent folder', 'first child', 'sub child'],
        checked: true,
        color: '#0A77A6',
        isSystemFolderChild: false,
        folderChildIDS: [],
        folderParentID: 'parent folder/first child',
        protonPath: ['parent folder', 'first child', 'sub child'],
        separator: '/',
        size: 0,
        disabled: false,
        errors: [],
        isLabel: false,
        category: undefined,
        systemFolder: undefined,
    },
    {
        id: 'parent folder/second child',
        providerPath: ['parent folder', 'second child'],
        checked: true,
        color: '#0A77A6',
        isSystemFolderChild: false,
        folderChildIDS: [],
        folderParentID: 'parent folder',
        protonPath: ['parent folder', 'second child'],
        separator: '/',
        size: 0,
        disabled: false,
        errors: [],
        isLabel: false,
        category: undefined,
        systemFolder: undefined,
    },
];

export const getRenamedFolders = (newName: string) => {
    return [
        {
            id: 'parent folder',
            providerPath: ['parent folder'],
            checked: true,
            color: '#0A77A6',
            isSystemFolderChild: false,
            folderChildIDS: [
                'parent folder/first child',
                'parent folder/first child/another sub child',
                'parent folder/first child/sub child',
                'parent folder/second child',
            ],
            protonPath: [newName],
            separator: '/',
            size: 0,
            disabled: false,
            errors: [],
            isLabel: false,
            category: undefined,
            systemFolder: undefined,
            folderParentID: undefined,
        },
        {
            id: 'parent folder/first child',
            providerPath: ['parent folder', 'first child'],
            checked: true,
            color: '#0A77A6',
            isSystemFolderChild: false,
            folderChildIDS: ['parent folder/first child/another sub child', 'parent folder/first child/sub child'],
            folderParentID: 'parent folder',
            protonPath: [newName, 'first child'],
            separator: '/',
            size: 0,
            disabled: false,
            errors: [],
            isLabel: false,
            category: undefined,
            systemFolder: undefined,
        },
        {
            id: 'parent folder/first child/another sub child',
            providerPath: ['parent folder', 'first child', 'another sub child'],
            checked: true,
            color: '#0A77A6',
            isSystemFolderChild: false,
            folderChildIDS: [],
            folderParentID: 'parent folder/first child',
            protonPath: [newName, 'first child', 'another sub child'],
            separator: '/',
            size: 0,
            disabled: false,
            errors: [],
            isLabel: false,
            category: undefined,
            systemFolder: undefined,
        },
        {
            id: 'parent folder/first child/sub child',
            providerPath: ['parent folder', 'first child', 'sub child'],
            checked: true,
            color: '#0A77A6',
            isSystemFolderChild: false,
            folderChildIDS: [],
            folderParentID: 'parent folder/first child',
            protonPath: [newName, 'first child', 'sub child'],
            separator: '/',
            size: 0,
            disabled: false,
            errors: [],
            isLabel: false,
            category: undefined,
            systemFolder: undefined,
        },
        {
            id: 'parent folder/second child',
            providerPath: ['parent folder', 'second child'],
            checked: true,
            color: '#0A77A6',
            isSystemFolderChild: false,
            folderChildIDS: [],
            folderParentID: 'parent folder',
            protonPath: [newName, 'second child'],
            separator: '/',
            size: 0,
            disabled: false,
            errors: [],
            isLabel: false,
            category: undefined,
            systemFolder: undefined,
        },
    ];
};