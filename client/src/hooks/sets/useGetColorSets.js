import { useState,useCallback } from 'react';
import picturethis from '../../api/picturethis'
import PropTypes from 'prop-types'

export const getColorSets = async ({paginationOptions,searchQuery="",sort="lowercaseName",page="1"}) => {
  const response = await picturethis.get(`set/?q=${searchQuery}&sort=${sort}&page=${page}&limit=${paginationOptions.limit}&select=-colorRange`,{ withCredentials: true });
  return response.data;
}

getColorSets.propTypes = {
  paginationOptions: PropTypes.object,
  searchQuery: PropTypes.string,
  sort: PropTypes.string,
  page: PropTypes.string,

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