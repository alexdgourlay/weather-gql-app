import { h } from "preact";

import LocationResult from "./result/locationResult";
import { Results, Result } from "./types";

interface DropDownProps {
  results: Results;
  onResultSelected?(result: Result): void;
}

const DropDown = (props: DropDownProps) => {
  const { results, onResultSelected = () => {} } = props;

  return (
    <div>
      {results &&
        results.map((result) => (
          <>
            <LocationResult
              data={result}
              onClick={() => {
                onResultSelected(result);
              }}
            />
          </>
        ))}
    </div>
  );
};

export default DropDown;
