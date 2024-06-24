import React from 'react';
import Loading from '../../loading/Loading';
import Error from '../../error/Error';
import Card from '../../card/Card';
import { Bank, CreditCard } from '../../../types/types';

type CradsListProps = {
    isInitialState: boolean
    isError: boolean
    isLoading: boolean
    errorMessage?: string | null
    banks: Bank[]
    creditCards: CreditCard[]
};

const CardsList: React.FC<CradsListProps> = ({ isError, isLoading, isInitialState, errorMessage, banks, creditCards }) => {


    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError && errorMessage) {
        return (
            <Error message={errorMessage} />
        )
    }

    return (
        <>
            {creditCards.length === 0 && !isInitialState && (
                <Error message={"Sorry, we didn't find credit cards with those details."} />
            )}
            {creditCards.map((card) => (
                <Card key={card.creditCardNumber} card={card} banks={banks} />
            ))}
        </>
    );
};

export default CardsList;
