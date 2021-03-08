import { useState,useCallback } from 'react';
import picturethis from '../../api/picturethis'
import PropTypes from 'prop-types'

export const deleteSet = async ({id}) => {
  const response = await picturethis.delete(`set/${id}`,{ withCredentials: true });
  return response;
}

deleteSet.propTypes = {
  id: PropTypes.string
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