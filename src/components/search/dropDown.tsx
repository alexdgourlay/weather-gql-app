import { h } from "preact";
import styled, { StyledProps } from "styled-components";

import LocationResult from "./result/locationResult";
import { Results, Result } from "./types";

interface DropDownProps {
  className?: string;
  results: Results;
  onResultSelected?(result: Result): void;
}

const Container = styled.div(
  (props: StyledProps<{}>) => `
    background: ${props.theme.color.background};
    width: calc(100vw - 2 * var(--global-padding));

    ${props.theme.breakpoints.tablet} {
      width: 400px;
    }
`
);

const List = styled.ul``;

const ListItem = styled.li``;

const DropDown = (props: DropDownProps) => {
  const { className, results, onResultSelected = () => {} } = props;

  return (
    <Container className={className}>
      <List>
        {results &&
          results.map((result) => (
            <ListItem>
              <LocationResult
                data={result}
                onClick={() => {
                  onResultSelected(result);
                }}
              />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default DropDown;
