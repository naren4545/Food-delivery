import { useCallback, useEffect, useState } from "react";

async function SendHttpRequest(url, config) {
    console.log(url)
   
  const response = await fetch(url, config);
  const resData = await response.json();

  
  if (!response.ok) {
    throw new Error(resData.message || "failed to send req");
  }
  return resData
  
}

export default function useHttp(url, config,inidata) {
  const [data, setdata] = useState(inidata);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();

  function cleardata(){

setdata(inidata)

  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setisLoading(true);
      try {
        const redData = await SendHttpRequest(url, {...config, body:data});
        setdata(redData);
        console.log(data)
      } catch (error) {
        seterror(error.message || "something went wrong");
      }

      setisLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method) ||!config) {
      sendRequest();
    }
  }, [sendRequest,config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    cleardata
  };
}
