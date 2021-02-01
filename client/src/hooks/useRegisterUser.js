import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";


import picturethis from '../api/picturethis'

export const registerUser = async (options) => {
  console.log(options)

  const response = await picturethis.post(
    'auth/register',
    {
      "name": options.name,
      "email": options.email,
      "password": options.password
    }
  );

  // const response = picturethis.post('/register', {
  //   email: options.email,
  //   password: options.password,
  //   password: options.password2
  // })

  console.log(response);
  
  return;
}

registerUser.propTypes = {
  formFields: PropTypes.object
}

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await registerUser(options);
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