import styled from 'styled-components';
import { InfoModel } from './types';
import { ReactComponent as LogoWide } from 'assets/icons/logo-wide.svg';
import React from 'react';

type Props = React.HTMLAttributes<any> & {
  info: InfoModel;
};

const Container = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(p) => p.theme.accentDark};
  box-shadow: 0 1rem 3rem rgba(0 0 0 / 30%);
`;

const Table = styled.table`
  font-size: 0.9rem;
  margin: 1em 0;
  th {
    font-size: 0.8em;
    text-transform: uppercase;
    text-align: start;
    opacity: 0.5;
    padding-right: 2em;
  }
`;

export const Info: React.FC<Props> = ({ info, ...props }) => {
  return (
    <Container {...props}>
      <LogoWide />
      <Table>
        <tbody>
          <tr>
            <th>Ranna Endpoint</th>
            <td>{info.rannaEndpoint}</td>
          </tr>
          <tr>
            <th>Snippets Endpoint</th>
            <td>{info.snippetsEndpoint}</td>
          </tr>
          <tr>
            <th>Version</th>
            <td>{info.version}</td>
          </tr>
          <tr>
            <th>Build Date</th>
            <td>{info.builddate}</td>
          </tr>
          <tr>
            <th>Build Go Version</th>
            <td>{info.go_version}</td>
          </tr>
          <tr>
            <th>Sandbox Provider</th>
            <td>
              {info.sandbox.type} ({info.sandbox.version})
            </td>
          </tr>
        </tbody>
      </Table>
      <span>
        <a target="_blank" href="https://github.com/ranna-go">
          GitHub
        </a>
        &nbsp;|&nbsp;
        <a target="_blank" href="https://zekro.de/imprint">
          Imprint
        </a>
      </span>
    </Container>
  );
};
