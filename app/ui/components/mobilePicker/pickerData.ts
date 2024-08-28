export const getYearsTillCurrent = (yearToStart: number) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - yearToStart + 1 }, (_, i) =>
      (yearToStart + i).toString()
    );
  }

 
  export const generateHeightOptions = (
    startHeight: number,
    endHeight: number,
    unit: string,
    step: number = 1
  ): string[] => {
    return Array.from(
      { length: Math.floor((endHeight - startHeight) / step) + 1 },
      (_, i) => `${startHeight + i * step}${unit}`
    );
  };

  export const generateWeightOptions = (
    startWeight: number,
    endWeight: number,
    unit: string,
    step: number = 1
  ): string[] => {
    return Array.from(
      { length: Math.floor((endWeight - startWeight) / step) + 1 },
      (_, i) => `${startWeight + i * step}${unit}`
    );
  };

  export const generateImperialHeightOptions = (
    startHeight: number,
    endHeight: number
  ): string[] => {
    return Array.from({ length: endHeight - startHeight + 1 }, (_, i) => {
      const totalInches = startHeight + i;
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return `${feet}'${inches}"`;
    });
  };