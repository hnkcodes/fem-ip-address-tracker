import { useRef } from "react";
import { type SubmitEvent } from "react";

interface SearchWindowProp {
  onSearch: (query: string, queryType: string) => void;
}

export default function SearchWindow({ onSearch }: SearchWindowProp) {
  const queryRef = useRef<HTMLInputElement>(null);

  const ipPattern =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  const domainPattern =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  function handleSearch(event: SubmitEvent) {
    event.preventDefault();
    const query = queryRef.current?.value;
    if (typeof query !== "string") return;

    let queryType: string = "";

    if (ipPattern.test(query)) {
      queryType = "ip";
    } else if (domainPattern.test(query)) {
      queryType = "domain";
    } else {
      return;
    }

    onSearch(query, queryType);
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          id="query"
          ref={queryRef}
          placeholder="Search for any IP Address or Domain"
          required
          className="search-input"
        />

        <button type="submit" className="search-btn">
          <img src="/images/icon-arrow.svg" alt="arrow icon" />
        </button>
      </form>
    </div>
  );
}
