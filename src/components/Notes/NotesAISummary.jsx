import { useRef } from 'react';

const NotesAISummary = () => {
  const modalRef = useRef();

  return (
    <>
      <div className='fixed bottom-4 right-4'>
        <button
          onClick={() => modalRef.current.showModal()}
          className='bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10'
        >
          ✨
        </button>
      </div>
      <dialog id='modal-note' className='modal' ref={modalRef}>
        <div className='modal-box h-[500px]'>
          <div className='modal-action mb-2'>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
