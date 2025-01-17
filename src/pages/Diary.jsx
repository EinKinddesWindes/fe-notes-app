import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateEntry, MoodAIAnalysis, EntriesList } from '@/components/Diary';

const Diary = () => {
  const [entries, seEntries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/entries`);
        seEntries(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <EntriesList entries={entries} />
      <CreateEntry setEntries={seEntries} />
      <MoodAIAnalysis entries={entries} />
    </>
  );
};

export default Diary;
