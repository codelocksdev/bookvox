import styled from 'styled-components';

import VoiceSettings from '../components/settings/VoiceSettings';
import AwsSettings from '../components/settings/AwsSettings';
import AccordionItem from '../components/AccordionItem';
import OutputSettings from '../components/settings/OutputSettings';
import useSettings from '../hooks/useSettings';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
`;

const Settings = () => {
  const settings = useSettings();

  return (
    <Container>
      <AccordionItem headerText={'Output Settings'}>
        <OutputSettings {...settings} />
      </AccordionItem>
      <AccordionItem headerText={'Voice Settings'}>
        <VoiceSettings {...settings} />
      </AccordionItem>
      <AccordionItem headerText={'AWS Account Settings'}>
        <AwsSettings {...settings} />
      </AccordionItem>
    </Container>
  );
};

export default Settings;
