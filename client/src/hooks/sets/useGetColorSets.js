import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import picturethis from '../../api/picturethis'

export const getColorSets = async ({paginationOptions,searchQuery="",sort="lowercaseName",page="1"}) => {

  // Sanitize sort to follow mongodb operators syntax
  const response = await picturethis.get(`set/?q=${searchQuery}&sort=${sort}&page=${page}&limit=${paginationOptions.limit}&select=-colorRange`,{ withCredentials: true });

  console.log(response.data)

  return response.data;
}

getColorSets.propTypes = {
    userId: PropTypes.number
}

export const useGetColorSets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await getColorSets(options);
      setData(results);
      return results;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    execute: useCallback(execute, [])
  };
}