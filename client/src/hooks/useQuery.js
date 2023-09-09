import { useEffect, useState } from "react";

const useQuery = (promise, dependencyList = []) => {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await promise();
            setFetching(false);
            setData(res)
        })()
    }, dependencyList)

    return {
        data,
        fetching,
        setData
    }
}

export default useQuery;