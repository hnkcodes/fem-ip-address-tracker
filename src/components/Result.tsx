import ResultItem from "./ResultItem";
import type AddressObj from "../interface/AddressObj";

interface ResultProp {
  data: AddressObj;
}

export default function Result({ data }: ResultProp) {
  return (
    <section className="result-container">
      <ResultItem title="ip address" description={data.ip} />
      <ResultItem
        title="location"
        description={`${data.region}  ${data.city}`}
      />
      <ResultItem title="time zone" description={`UTC ${data.timezone}`} />
      <ResultItem title="isp" description={data.isp} />
    </section>
  );
}
