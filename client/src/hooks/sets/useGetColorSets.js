import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import axios from "axios";

import picturethis from '../../api/picturethis'

export const getColorSets = async (userId) => {
    const sampleSetData = [
        {
            imagePreview: 'https://via.placeholder.com/150x100.png',
            colors: [
                '#4F5837','#5E6647','#6C7357','#7B8167','#898E77'
            ],
            created: new Date().toUTCString(),
            lastUpdated: new Date().toUTCString(),
            name: 'Green Color Set'
        },
        {
            imagePreview: 'https://via.placeholder.com/150x100.png',
            colors: [
                '#7A6C5D','#8E8173','#A19689','#B5AB9F','#C9BFB5'
            ],
            created: new Date().toUTCString(),
            lastUpdated: new Date().toUTCString(),
            name: 'Brown Color Set'
        },
        {
            imagePreview: 'https://via.placeholder.com/150x100.png',
            colors: [
                '#343A40','#4B5055','#61666A','#787C80','#8E9295'
            ],
            created: new Date().toUTCString(),
            lastUpdated: new Date().toUTCString(),
            name: 'Gray Color Set'
        },
    ]
    return sampleSetData;
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