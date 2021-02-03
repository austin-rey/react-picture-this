import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";

import picturethis from '../../api/picturethis'

export const getColorSet = async (setId) => {
  const response = await picturethis.get(`set/${setId}`,{ withCredentials: true });
  return response.data.data;
}

getColorSet.propTypes = {
    setId: PropTypes.number
}

export const useGetColorSet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await getColorSet(options);
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