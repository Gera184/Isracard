
export interface CreditCard {
    creditCardNumber?: string;
    dateCreated: Date;
    image: string;
    isBlocked: boolean;
    isDigital: boolean;
    creditLimit: number;
    bankCode: number;
}

export interface Bank {
    name: string;
    code: number | null;
    description: string;
}

export interface FormData {
    requestedAmount: number;
    occupation: string;
    averageIncome: number;
}


