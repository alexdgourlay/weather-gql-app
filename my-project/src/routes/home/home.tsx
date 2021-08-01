import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { RoutableProps } from "preact-router";

import Location from "../../types/location";
import { Search } from "../../components/index";
import WeatherWidget from "../../components/weatherWidget/weatherWidget";

const searchWebSocket = new WebSocket("ws://localhost:8999");

const Home = (props: RoutableProps) => {
  const [selectedResultId, setSelectedResultId] = useState<
    Location["id"] | undefined
  >(undefined);

  return (
    <div>
      <Search
        webSocket={searchWebSocket}
        onResultSelected={(result) => {
          console.log(result);
          setSelectedResultId(result.id);
        }}
      />

      {selectedResultId && (
        <WeatherWidget cityId={[selectedResultId.toString()]} />
      )}
    </div>
  );
};

export default Home;
