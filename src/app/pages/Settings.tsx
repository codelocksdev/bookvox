import VoiceSettings from '../components/settings/VoiceSettings';
import AwsSettings from '../components/settings/AwsSettings';
import AccordionItem from '../components/AccordionItem';
import OutputSettings from '../components/settings/OutputSettings';
import useSettings from '../hooks/useSettings';
import { SettingsContainer } from '../components/styled';

const Settings = () => {
  const settings = useSettings();

  return (
    <SettingsContainer>
      <AccordionItem headerText={'Output Settings'}>
        <OutputSettings {...settings} />
      </AccordionItem>
      <AccordionItem headerText={'Voice Settings'}>
        <VoiceSettings {...settings} />
      </AccordionItem>
      <AccordionItem headerText={'AWS Account Settings'}>
        <AwsSettings {...settings} />
      </AccordionItem>
    </SettingsContainer>
  );
};

export default Settings;
