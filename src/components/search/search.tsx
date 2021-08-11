import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import styled, { StyledProps } from "styled-components";
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

const Container = styled.div`
  position: relative;
  height: 2em;
  z-index: 10;
`;

const Input = styled.input(
  (props: StyledProps<{}>) =>
    `
    height: 100%;
    margin-inline-start: ${props.theme.spacing.s};
  `
);

const StyledDropDown = styled(DropDown)`
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
`;

const Search = (props: SearchProps) => {
  const {
    webSocket,
    debounceDelay = 400,
    dropDownMaxLength = 8,
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

  const handleResultSelected: typeof onResultSelected = (result: Result) => {
    setQuery("");
    setResults(null);
    onResultSelected(result);
  };

  useEffect(() => {
    webSocket.onmessage = handleWsMessage;
  }, [webSocket]);

  useEffect(() => {
    if (debouncedQuery !== undefined) webSocket.send(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Container>
      <label>Add a location</label>

      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={({ currentTarget }) => {
          setQuery(currentTarget.value);
        }}
      />

      <StyledDropDown
        results={results && results.slice(0, dropDownMaxLength)}
        onResultSelected={handleResultSelected}
      />
    </Container>
  );
};

export default Search;
