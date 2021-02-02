import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";

import picturethis from '../api/picturethis'

export const getColorSet = async (setId) => {
    const sampleSetData = {
        name: 'Color Set 1',
        image: "https://via.placeholder.com/800x400.png",
        colors: [
            ['#F18C7E','#EF7B6C','#ED6B5A','#EB5A47','#E94A35'],
            ['#A0BD89','#96B67C','#8CAE6F','#82A762','#789D58'],
            ['#F6F3CB','#F3EFBA','#F0EBA8','#EDE796','#EAE485'],
            ['#B4D0CC','#A7C8C3','#9BC0BB','#8EB8B3','#82B0AB'],
            ['#766E87','#6C657B','#625C70','#585365','#4E495A']
        ],
        created: new Date().toUTCString(),
    }
    return sampleSetData;
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