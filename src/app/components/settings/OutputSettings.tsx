interface OutputSettingsProps {
  outputDirectory: string;
  setOutputDirectory(outputDirectory: string): void;
}

const OutputSettings = (props: OutputSettingsProps) => {
  const onChange = async () => {
    // check if directory exists. if not, prompt asking to make it
    // call setOutputDirectory()
  };
  return <></>;
};

export default OutputSettings;
