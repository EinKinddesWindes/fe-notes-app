import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateNote, NotesList } from '@/components/Notes';

const SchoolNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/notes`);
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <NotesList notes={notes} />
      <CreateNote setNotes={setNotes} />
    </>
  );
};

export default SchoolNotes;
