import styled from 'styled-components';
import { Button, Intent } from '@blueprintjs/core';

import VoiceSettings from '../components/settings/VoiceSettings';
import AwsSettings from '../components/settings/AwsSettings';
import AccordionItem from '../components/AccordionItem';
import { SuccessToaster } from '../components/toasters';
import OutputSettings from '../components/settings/OutputSettings';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
`;

const Settings = () => {
  const handleSave = () => {
    SuccessToaster.show({ message: 'Settings Saved!', intent: Intent.SUCCESS });
  };

  return (
    <Container>
      <Button icon={'floppy-disk'} text={'Save'} onClick={handleSave} />
      <AccordionItem headerText={'Output Settings'}>
        <OutputSettings />
      </AccordionItem>
      <AccordionItem headerText={'Voice Settings'}>
        <VoiceSettings />
      </AccordionItem>
      <AccordionItem headerText={'AWS Account Settings'}>
        <AwsSettings />
      </AccordionItem>
    </Container>
  );
};

export default Settings;
