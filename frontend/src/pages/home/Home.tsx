import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import API from '../../api/api';
import { Bank } from '../../types/types';
import SearchComponent from '../../components/search/SearchComponent';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import "./Home.css";

const Home: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await API.request({
          method: 'GET',
          url: API.banks,
        });

        const { statusCode, payload } = response.data
        if (statusCode === 200) {
          setBanks(payload as Bank[]);
          setIsError(false);
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage('Error fetching banks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return (
    <>
      <Header />
      {isError && <Error message={errorMessage} />}
      {isLoading && <Loading />}
      {!isError && !isLoading && (
        <SearchComponent banks={banks} />
      )}
    </>
  );
};

export default Home;

