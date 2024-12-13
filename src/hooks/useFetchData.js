import { useState } from 'react';
import { fetchData } from '../api/fetchHelper'; // Assume fetchHelper is defined

export const useFetchData = () => {
    const [data, setData] = useState(null);
    // const [reponseData, setReponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOnDemand = async (endpoint, method, body = {}) => {

        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const result = await fetchData(endpoint, method, body);

            setData(result);
            // setReponseData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchOnDemand };
};
