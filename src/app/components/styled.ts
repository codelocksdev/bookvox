import styled from 'styled-components';
import { Card, Dialog, Divider } from '@blueprintjs/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AddBookDialogContainer = styled(Dialog)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.div`
  color: #8abbff;
  font-weight: 400;
  margin-bottom: 8px;
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

export const AccordionContainer = styled(Card)`
  width: 100%;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const AccordionHeader = styled(FlexRow)`
  cursor: pointer;
  color: #8abbff;
  font-weight: 400;
  padding: 16px;
  justify-content: space-between;
`;

export const AccordionContent = styled.div`
  padding: 16px;
`;

export const StyledDivider = styled(Divider)`
  margin-left: 16px;
  margin-right: 16px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const BookUploadContainer = styled.div`
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: #383e47;
  display: flex;
  flex-direction: row;
  padding: 8px;
  border-radius: 8px;
  gap: 16px;
`;

export const SideColumn = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const MiddleColumn = styled(FlexColumn)`
  flex: 1;
  gap: 8px;
`;

export const OutputSettingsCard = styled(FlexColumn)`
  align-items: flex-start;
`;

export const OutputSettingsHeader = styled(FlexRow)`
  gap: 8px;
  font-size: 20px;
`;

export const FileUploadItemContainer = styled(FlexRow)<{ isEven: boolean }>`
  justify-content: space-between;
  padding: 8px;
  width: 100%;
  background-color: ${({ isEven }) => (isEven ? '#1C2127' : '#252A31')};
`;

export const AudioPlayer = styled(FlexRow)`
  gap: 8px;
`;

export const VoiceSettingsCard = styled(FlexColumn)`
  gap: 8px;
`;

export const UploadWidgetContainer = styled.div`
  margin: auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 8px;
`;

export const UploadWidgetCard = styled(PerfectScrollbar)<{
  listEmpty: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  border-color: #abb3bf;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  padding: 16px;
  cursor: ${({ listEmpty }) => (listEmpty ? 'pointer' : 'auto')};
`;

export const ButtonBar = styled(FlexRow)`
  justify-content: flex-end;
  gap: 16px;
`;

export const AwsSettingsCard = styled(FlexRow)`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
`;
