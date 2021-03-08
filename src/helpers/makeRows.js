import { RANK_INFO } from '../constans';

export function makeRows(data) {
  let rows = [];
  const sorted = Object.entries(data).sort((a, b) => a[0].slice(4) - b[0].slice(4));
  sorted.forEach(([key, values]) => {
    if (key !== 'rank0') {
      rows.push([
        RANK_INFO[key].tier,
        RANK_INFO[key].match,
        `${values.winners} x`,
        `€ ${parseFloat(values.prize).toFixed(2)}`
      ]);
    }
  });

  return rows;
}
