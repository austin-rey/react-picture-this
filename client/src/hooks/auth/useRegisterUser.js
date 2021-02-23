import { useState,useCallback,useContext } from 'react';
import PropTypes from 'prop-types'
import picturethis from '../../api/picturethis'
import AuthContext from '../../context/authContext';

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
  const session = useContext(AuthContext);
  const {addToken,userLogin} = session;

  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await registerUser(options);
      setData(results);
      await addToken(results.data.token)
      await userLogin({name: results.data.user.name, email: results.data.user.email})
      options.history.push('/sets')
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