export const getDieValue = (dieFaces: number) => {
  return Math.floor(Math.random() * dieFaces) + 1;
};

export const castGroupedDice = (dice: Die[]): Die[] => {
  return dice.map((die: Die) => ({
    ...die,
    value: getDieValue(parseInt(die.type.split('d')[1])),
  }));
};
