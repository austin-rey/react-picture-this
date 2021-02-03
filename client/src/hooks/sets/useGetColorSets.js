import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";

import picturethis from '../../api/picturethis'

export const getColorSets = async () => {
  const response = await picturethis.get('set/',{ withCredentials: true });
  return response.data.data;
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