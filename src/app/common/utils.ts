export const getSrc = (base64: string) => {
  const header = 'data:audio/wav;base64,';

  return `${header}${base64}`;
};
