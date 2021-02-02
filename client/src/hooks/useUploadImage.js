import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";

import picturethis from '../api/picturethis'

export const uploadImage = async (formData) => {
  const response = await picturethis.post(
    'set/create',
    formData,
    {'content-type': 'multipart/form-data'}
  );
  
  return;
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