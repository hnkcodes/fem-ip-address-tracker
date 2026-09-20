import { useEffect, useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import type AddressObj from "./interface/AddressObj";

const ipKey = import.meta.env.VITE_IP_ADDRESS_API_KEY;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function fetchAddressData(query?: string, queryType?: string) {
    try {
      setIsLoading(true);

      let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}`;
      if (queryType === "ip") {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&ipAddress=${query}`;
      } else if (queryType === "domain") {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&domain=${query}`;
      }

      const resData = await fetch(url);
      if (!resData.ok) throw new Error("failed to fetch data");
      const data = await resData.json();

      const addressData: AddressObj = {
        ip: data.ip,
        isp: data.isp,
        city: data.location.city,
        region: data.location.region,
        lat: data.location.lat,
        lng: data.location.lng,
        timezone: data.location.timezone,
      };

      return addressData;
    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message);
      } else {
        setIsError("Failed to fetch data");
      }
      return null;
    } finally {
      setIsLoading(false);
      setIsError(null);
    }
  }

  const [addressData, setAddressData] = useState<AddressObj | null>(null);

  useEffect(() => {
    async function fetchData() {
      const receivedData = await fetchAddressData();
      setAddressData(receivedData);
    }
    fetchData();
  }, []);

  async function handleSearch(query: string, queryType: string) {
    const receivedData = await fetchAddressData(query, queryType);

    if (receivedData) {
      setAddressData(receivedData);
    }
    if (receivedData === null) {
      setAddressData(null);
    }
  }

  return (
    <>
      <Header addressData={addressData} onSearch={handleSearch}></Header>
      {isError && <p className="error-message">{isError}</p>}
      {!isError && isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        addressData && <Map lat={addressData.lat} lng={addressData.lng} />
      )}
    </>
  );
}

export default App;
