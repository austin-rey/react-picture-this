import { useState,useCallback } from 'react';
import PropTypes from 'prop-types'
import picturethis from '../../api/picturethis'

export const uploadImage = async ({formData}) => {
  const response = await picturethis.post(
    'set/create',
    formData,
    {headers: {'content-type': 'multipart/form-data'}, withCredentials: true },
  );
  
  return response;
}

uploadImage.propTypes = {
    formData: PropTypes.object
}

export const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await uploadImage(options);
      setData(results);
      options.history.push(`/set/${results.data.data._id}`)
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