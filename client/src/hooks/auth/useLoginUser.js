import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import picturethis from '../../api/picturethis'

export const loginUser = async (options) => {
  const response = await picturethis.post('auth/login', {
    email: options.email,
    password: options.password
  })

  return response;
}

loginUser.propTypes = {
    formFields: PropTypes.object
}

export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await loginUser(options);
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