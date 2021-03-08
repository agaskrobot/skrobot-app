import { useState, useEffect } from 'react';

import { getResultsInfo } from '../../api';
import { Alert, Spinner } from '../../components';
import { makeRows } from '../../helpers/makeRows';
import { DATES } from '../../constans';
import { Table, Dropdown, Section } from 'skrobot-lib';

export function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [results, setResults] = useState([]);

  const getResults = () => {
    setLoading(true);

    // Call api with selected date
    getResultsInfo(selectedDate)
      .then((response) => {
        let rows = makeRows(response.data.last[0].odds);
        setResults(rows);
      })
      .catch((error) => {
        setError(error.message);
        setResults([]);
      })
      .finally(() => setLoading(false));
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
          <div className="flex-col items-center justify-center mt-10">
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
