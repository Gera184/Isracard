export const inputConfig = [
    {
        key: 'blocked',
        label: 'Blocked',
        type: 'select',
        options: [
            { label: 'Yes', value: "true" },
            { label: 'No', value: "false" },
        ],
    },
    {
        key: 'cardNumber',
        label: 'Card Number',
        type: 'text',
    },
    {
        key: 'bankCode',
        label: 'Bank Code',
        type: 'number',
    },
    {
        key: 'getAllCards',
        label: 'Get All Cards',
        type: 'select',
        options: [
            { label: 'Yes', value: "true" },
            { label: 'No', value: "false" },
        ],
    },
];
