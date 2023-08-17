import { useMemo } from 'react';

import countryList from 'react-select-country-list';

const continent = [
  {
    label: 'Africa',
  },
  {
    label: 'Americas',
  },
  {
    label: 'Asia',
  },
  {
    label: 'Europe',
  },
  {
    label: 'Australia',
  },
];

export function useCountries() {
  return useMemo(() => {
    const cl = countryList().getData();

    const region = continent.map((option) => {
      return {
        type: 'region',
        value: option.label,
        ...option,
      };
    });
    const countryListOptions = cl.map((option) => {
      return {
        type: 'sub-region',
        ...option,
      };
    });

    return [...region, ...countryListOptions];
  }, []);
}
