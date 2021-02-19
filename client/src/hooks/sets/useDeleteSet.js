import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import picturethis from '../../api/picturethis'

export const deleteSet = async ({id}) => {
    console.log(id)
  const response = await picturethis.delete(`set/${id}`,{ withCredentials: true });
  return response;
}

export const useDeleteSet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      console.log(options)
      const results = await deleteSet(options);
      setData(results);
      options.history.push('/sets')
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