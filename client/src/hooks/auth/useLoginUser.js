import { useState,useCallback,useContext } from 'react';
import PropTypes from 'prop-types'
import picturethis from '../../api/picturethis'
import AuthContext from '../../context/authContext';

export const loginUser = async ({loginUser}) => {
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
  const session = useContext(AuthContext);
  const {addToken,userLogin} = session;

  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await loginUser(options);
      setData(results);
      await addToken(results.data.token)
      await userLogin({name: results.data.user.name, email: results.data.user.email})
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
    execute: useCallback(execute)
  };
}