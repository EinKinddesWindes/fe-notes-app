const NoteCard = ({ note }) => {
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure className='h-40 border-b-2 border-red-500'>
        <img src={note.image} alt={note.title} className='object-cover max-w-max ' />
      </figure>
      <div className='card-body h-56'>
        <h2 className='card-title'>{note.title}</h2>
        <p className='truncate text-wrap'>{note.content}</p>
      </div>
    </div>
  );
};

export default NoteCard;
