import { useState,useCallback } from 'react';
import PropTypes from 'prop-types'
import picturethis from '../../api/picturethis'

export const registerUser = async ({registerUser}) => {
  const response = await picturethis.post(
    'auth/register',
    {
      "name": registerUser.username,
      "email": registerUser.email,
      "password": registerUser.password
    },{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
  })
  console.log(response)
  return response;
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
      console.log(error)
      setError(error);
    } finally {
      options.history.push('/sets')
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