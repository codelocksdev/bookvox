import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Label from './Label';

export const AddBookDialogContainer = styled(Dialog)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderText = styled(Label)`
  font-size: 16px;
`;

export const ListBox = styled(PerfectScrollbar)`
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-color: white;
  border-radius: 4px;
  border-style: solid;
  height: 128px;
  background-color: #1c2127;
`;

export const ListItem = styled.div<{ isEven: boolean }>`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isEven }) => (isEven ? '#1C2127' : '#252A31')};
`;
