import { useState,useCallback } from 'react';
import PropTypes from 'prop-types'
import picturethis from '../../api/picturethis'
import { setSessionCookie } from "../../util/session"

export const loginUser = async ({loginUser, history}) => {
  const response = await picturethis.post('auth/login', 
  {
    email: loginUser.email,
    password: loginUser.password
  },{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
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
      setSessionCookie(results.data.token)
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