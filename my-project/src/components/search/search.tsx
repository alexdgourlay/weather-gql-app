import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useDebounce } from "../../hooks/index";

import DropDown from "./dropDown";
import { Result, Results } from "./types";

interface SearchProps {
  webSocket: WebSocket;
  debounceDelay?: number;
  dropDownMaxLength?: number;
  onResultsChange?(results: Results): void;
  onResultSelected?(result: Result): void;
}

const Search = (props: SearchProps) => {
  const {
    webSocket,
    debounceDelay = 400,
    dropDownMaxLength = 5,
    onResultsChange = () => {},
    onResultSelected = () => {},
  } = props;

  const [query, setQuery] = useState<string | undefined>(undefined);
  const debouncedQuery = useDebounce(query, debounceDelay);

  const [results, setResults] = useState<Results>(null);

  const updateResults = (results: Results) => {
    setResults(results);
    onResultsChange(results);
  };

  const handleWsMessage = (event: MessageEvent<any>) => {
    let data: Results;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      // Non JSON response received.
      return;
    }
    updateResults(data);
  };

  useEffect(() => {
    webSocket.onmessage = handleWsMessage;
  }, [webSocket]);

  useEffect(() => {
    if (debouncedQuery !== undefined) webSocket.send(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <input
        onChange={({
          currentTarget,
        }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
          setQuery(currentTarget.value);
        }}
      />

      <DropDown
        results={results && results.slice(0, dropDownMaxLength)}
        onResultSelected={onResultSelected}
      />
    </>
  );
};

export default Search;
