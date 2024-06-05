import EntryCard from './EntryCard';

const EntriesList = ({ entries }) => {
  if (!entries.length) return <p className='p-5 text-center'>No notes available</p>;

  return (
    <div className='p-5 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4'>
      {entries.map(e => (
        <EntryCard key={e._id} entry={e} />
      ))}
    </div>
  );
};

export default EntriesList;
