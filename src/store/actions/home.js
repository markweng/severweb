export const CHANGE_NUMBER = 'CHANGE_NUMBER';

export function changeNumber (data) {
  return {
    type: CHANGE_NUMBER,
    data
  };
}