import React, { useState } from 'react';
import API from '../../api/api';
import { Bank, CreditCard } from '../../types/types';
import "./SearchComponent.css";
import { inputConfig } from './config';
import SearchInputField from './searchInput/SearchInputField';
import CardsList from './cardsList/CardsLIst';


type SearchComponentProps = {
  banks: Bank[];
};

const initialState = inputConfig.reduce((acc, input) => {
  acc[input.key] = input.type === 'select' ? "false" : '';
  return acc;
}, {} as { [key: string]: string });

const SearchComponent: React.FC<SearchComponentProps> = ({ banks }) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIserror] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isInitialState, setIsInitialState] = useState<boolean>(true);
  const [inputValues, setInputValues] = useState<any>(initialState);

  const handleInputChange = (key: string, value: string) => {
    let newInputValues;

    if (key === 'getAllCards' && value === "true") {
      newInputValues = {
        getAllCards: value,
        cardNumber: '',
        bankCode: '',
        blocked: false,
      };
    } else {
      newInputValues = {
        ...inputValues,
        [key]: value,
        getAllCards: key === 'getAllCards' ? value : "false",
      };
    }

    setInputValues(newInputValues);
  };


  const handleSearch = async () => {
    setLoading(true);

    try {
      const isGetAllCards = inputValues.getAllCards === "true";
      const url = isGetAllCards ? API.cards : API.filterCards;
      const params = isGetAllCards
        ? {}
        : {
          cardNumber: inputValues.cardNumber || undefined,
          bankCode: inputValues.bankCode || undefined,
          isBlocked: inputValues.blocked || false,
        };

      const response = await API.request({
        method: 'GET',
        url,
        params,
      });

      const { statusCode, payload } = response.data

      if (statusCode === 200) {
        setCreditCards(payload as CreditCard[]);
        setIserror(false);
        setErrorMessage(null);
      }

    } catch (error) {
      setIserror(true);
      setErrorMessage('Error fetching cards');
    } finally {
      setLoading(false);
      setIsInitialState(false)
    }
  };

  return (
    <div className="search-container">
      <h2>Credit Cards</h2>
      {inputConfig.map((input) => (
        <SearchInputField
          key={input.key}
          value={inputValues[input.key]}
          onChange={(value) => handleInputChange(input.key, value)}
          label={input.label}
          type={input.type}
          options={input.options}
        />
      ))}
      <button className="search-button" onClick={handleSearch}>Search Credit Cards</button>
      <ul className="cards-container">
        <CardsList banks={banks}
          creditCards={creditCards}
          isError={isError}
          isInitialState={isInitialState}
          isLoading={isLoading}
          errorMessage={errorMessage} />
      </ul>
    </div>
  );
};

export default SearchComponent;
