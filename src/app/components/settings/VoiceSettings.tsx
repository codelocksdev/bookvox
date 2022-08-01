import styled from 'styled-components';
import { Radio, RadioGroup, Slider, TextArea } from '@blueprintjs/core';
import { ChangeEvent, useState } from 'react';

import DropdownChooser from '../DropdownChooser';
import { VoiceIds } from '../../../shared/types/AwsConstants';
import { FlexRow, Label, VoiceSettingsCard } from '../styled';
import ButtonPlayer from '../ButtonPlayer';
import { useAppSelector } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';

interface VoiceSettingsProps {
  Engine: string;
  setEngine(engine: string): void;
  VoiceId: string;
  setVoiceId(voiceId: string): void;
  speed: string;
  setSpeed(speed: string): void;
}

const StyledTextArea = styled(TextArea)`
  flex: 1;
  margin-left: 32px;
`;

const VoiceSettings = ({
  Engine,
  setEngine,
  VoiceId,
  setVoiceId,
  speed,
  setSpeed,
}: VoiceSettingsProps) => {
  const [text, setText] = useState('');
  const [sliderPosition, setSliderPosition] = useState(
    parseFloat(speed.replace('%', '')) / 100
  );
  const awsConfigured = useAppSelector(
    (state: RootState) => state.settings.credentialsVerified
  );

  const renderSliderLabel = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  const updateSpeedSetting = () => {
    setSpeed(renderSliderLabel(sliderPosition));
  };

  const onTextInput = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setText(value);
  };

  return (
    <FlexRow>
      <VoiceSettingsCard>
        <div>
          <Label>AWS Polly Engine</Label>
          <RadioGroup
            onChange={(e) => setEngine(e.currentTarget.value)}
            selectedValue={Engine}
            inline
          >
            {/* TODO custom radio button with descriptions like the polly tester on aws dashboard */}
            <Radio label={'Standard'} value={'standard'} />
            <Radio label={'Neural'} value={'neural'} />
          </RadioGroup>
        </div>
        <DropdownChooser
          label={'Voice'}
          options={VoiceIds}
          selected={VoiceId}
          setSelection={setVoiceId}
        />
        <div>
          <Label>Speed</Label>
          <Slider
            min={0.1}
            max={1.5}
            stepSize={0.05}
            labelStepSize={1.4}
            labelRenderer={renderSliderLabel}
            value={sliderPosition}
            onChange={setSliderPosition}
            onRelease={updateSpeedSetting}
          />
        </div>
        <ButtonPlayer text={text} disabled={!awsConfigured} />
      </VoiceSettingsCard>
      <StyledTextArea
        placeholder={'Enter sample text...'}
        maxLength={300}
        onChange={onTextInput}
      />
    </FlexRow>
  );
};

export default VoiceSettings;
