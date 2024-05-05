// for filter labels style
export const filterLabelStyle = (allFilter: {
  merchants: string[];
  date: string[];
  price: number[];
}) => {
  let filterNumbers = 0;
  if (allFilter.merchants.length > 0) {
    filterNumbers = filterNumbers + 1;
  }
  if (allFilter.date.length > 0) {
    filterNumbers = filterNumbers + 1;
  }
  if (allFilter.price.length > 0) {
    filterNumbers = filterNumbers + 1;
  }
  switch (filterNumbers) {
    case 1:
      return 'active-one';
    case 2:
      return 'active-two';
    case 3:
      return 'active-three';
    default:
      return '';
  }
};
