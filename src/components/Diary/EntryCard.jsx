const EntryCard = ({ entry }) => {
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure className='h-40 border-b-2 border-red-500'>
        <img src={entry.image} alt={entry.title} className='object-cover max-w-max ' />
      </figure>
      <div className='card-body h-56'>
        <h2 className='card-title'>{entry.title}</h2>
        <h3 className='font-bold'>{new Date(entry.date).toDateString()}</h3>
        <p className='truncate text-wrap'>{entry.content}</p>
      </div>
    </div>
  );
};

export default EntryCard;
