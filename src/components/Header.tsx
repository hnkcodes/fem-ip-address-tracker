import SearchWindow from "./SearchWindow";
import Result from "./Result";
import type AddressObj from "../interface/AddressObj";

interface HeaderProp {
  addressData: AddressObj | null;
  onSearch: (query: string, queryType: string) => void;
}

export default function Header({ addressData, onSearch }: HeaderProp) {
  return (
    <header className="header">
      <h1 className="header-title">IP Address Tracker</h1>
      {addressData && <Result data={addressData} />}
      <SearchWindow onSearch={onSearch} />
    </header>
  );
}
