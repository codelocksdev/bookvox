import { useMemo } from 'react';
import { Intent } from '@blueprintjs/core';

import TextInput from '../../TextInput';
import useSettings from '../../../hooks/useSettings';
import { useAppSelector } from '../../../common/state/typedReduxMethods';
import { RootState } from '../../../common/state/store';

const KeysInput = () => {
  const { accessKeyId, secretAccessKey, setSecretAccessKey, setAccessKeyId } =
    useSettings();
  const verified = useAppSelector(
    (state: RootState) => state.settings.credentialsVerified
  );
  const intent = useMemo(
    () => (verified ? Intent.SUCCESS : Intent.DANGER),
    [verified]
  );

  return (
    <>
      <TextInput
        placeholder={'Access Key Id'}
        text={accessKeyId || ''}
        setText={setAccessKeyId}
        intent={intent}
      />
      <TextInput
        placeholder={'Secret Access Key'}
        text={secretAccessKey || ''}
        setText={setSecretAccessKey}
        intent={intent}
      />
    </>
  );
};

export default KeysInput;
