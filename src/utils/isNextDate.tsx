const isNextDate = (date: string) => {
  const departureDate = new Date(date);
  const currentDate = new Date();

  return departureDate > currentDate;
};

export default isNextDate;
