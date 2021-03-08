import { useState, useEffect } from 'react';

import { getResultsInfo } from '../../api';
import { Alert, Spinner } from '../../components';
import { makeRows } from '../../helpers/makeRows';
import { DATES } from '../../constans';

import { Table, Dropdown, Section } from 'skrobot-lib';

const RESULT_DEMO = {
  last: [
    {
      nr: 442,
      currency: 'EUR',
      date: {
        full: 'Die Lottozahlen vom Freitag, den 04.09.2020',
        day: 4,
        month: 9,
        year: 2020,
        hour: 21,
        minute: 0,
        dayOfWeek: 'Freitag'
      },
      closingDate: '04.09.2020, 19:00',
      lateClosingDate: '04.09.2020, 20:10',
      drawingDate: '04.09.2020, 21:00',
      numbers: [5, 23, 28, 38, 49],
      euroNumbers: [3, 9],
      jackpot: '10',
      marketingJackpot: '10',
      specialMarketingJackpot: '10',
      climbedSince: 12,
      Winners: 885440,
      odds: {
        rank0: { winners: 0, specialPrize: 0, prize: 0 },
        rank1: { winners: 0, specialPrize: 0, prize: 1000000000 },
        rank2: { winners: 0, specialPrize: 0, prize: 0 },
        rank3: { winners: 8, specialPrize: 0, prize: 8097190 },
        rank8: { winners: 38793, specialPrize: 0, prize: 1720 },
        rank9: { winners: 37462, specialPrize: 0, prize: 1720 },
        rank10: { winners: 62027, specialPrize: 0, prize: 1490 },
        rank4: { winners: 59, specialPrize: 0, prize: 365970 },
        rank5: { winners: 829, specialPrize: 0, prize: 23440 },
        rank6: { winners: 1357, specialPrize: 0, prize: 11130 },
        rank11: { winners: 203155, specialPrize: 0, prize: 820 },
        rank7: { winners: 2573, specialPrize: 0, prize: 5030 },
        rank12: { winners: 539177, specialPrize: 0, prize: 760 }
      }
    }
  ]
};

export function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [results, setResults] = useState([]);

  const getResults = () => {
    let rows = makeRows(RESULT_DEMO.last[0].odds);

    setResults(rows);
    // getResultsInfo(selectedDate)
    //   .then((response) => {
    //   })
    //   .catch((error) => setError(error.message));
  };

  // useEffect loads results foe selected date
  useEffect(() => {
    if (selectedDate.length > 0) {
      getResults();
    } else {
      setResults('');
    }
  }, [selectedDate]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap md:px-10 flex-row text-xl justify-center text-sm font-light min-w-max w-screen">
          <Alert error={error} onClose={() => setError(null)} />
          <div className="flex-col items-center justify-center">
            <Section>
              <Dropdown value={selectedDate} onChange={setSelectedDate} options={DATES} />
            </Section>
            <Section>
              <Table columns={['Tier', 'Match', 'Winners', 'Amount']} data={results.length ? results : []} />
            </Section>
          </div>
        </div>
      )}
    </>
  );
}
