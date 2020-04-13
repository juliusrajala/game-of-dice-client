export const mimicButtonBehavior = (fn: (args?: any[]) => void) => ({
  key,
}) => {
  if (key === 'Enter') {
    fn();
  }
};
