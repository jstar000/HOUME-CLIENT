export const createStepHandler = <T>(
  dispatch: (eventName: string, data: T) => void,
  eventName: string
) => {
  // create prefix: React에서 '함수를 만들어주는 함수'임을 나타내는 prefix 컨벤션
  return (data: T) => dispatch(eventName, data);
};
