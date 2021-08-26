import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { FormEvent } from "react";
import styled, { StyledProps } from "styled-components";
import { useDebounce } from "../../hooks/index";

import DropDown from "./dropDown";
import { Result, Results } from "./types";

interface SearchProps {
  webSocket: WebSocket;
  debounceDelay?: number;
  dropDownMaxLength?: number;
  onResultsChange?: (results: Results) => void;
  onResultSelected?: (result: Result) => void;
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
    dropDownMaxLength,
    onResultsChange = () => { },
    onResultSelected = () => { },
  } = props;

  const [query, setQuery] = useState<string | undefined>(undefined);
  const debouncedQuery = useDebounce(query, debounceDelay);
  const [results, setResults] = useState<Results>(null);

  const updateResults = (results: Results) => {
    setResults(results);
    onResultsChange(results);
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  }

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
    let webSocketPingInterval: ReturnType<typeof setInterval> | undefined;
    webSocket.onopen = () => {
      "Websocket connection established.";
      webSocketPingInterval = setInterval(() => {
        webSocket.send('');
      }, 30 * 1000)
    }
    return () => {
      if (webSocketPingInterval !== undefined) {
       clearInterval(webSocketPingInterval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webSocket]);

  useEffect(() => {
    if (debouncedQuery !== undefined) webSocket.send(debouncedQuery);
  }, [debouncedQuery, webSocket]);

  const resultsToDisplay =
    dropDownMaxLength === undefined || results === null ? results : results.slice(0, dropDownMaxLength);

  const hasResults = Array.isArray(resultsToDisplay) && resultsToDisplay.length > 0;

  return (
    <Container>
      <label>Add a location</label>

      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      {hasResults && <StyledDropDown results={resultsToDisplay} onResultSelected={handleResultSelected} />}
    </Container>
  );
};

export default Search;
