import { useRef } from 'react';
import axios from 'axios';

const NotesAISummary = () => {
  const modalRef = useRef();

  const handleGenAI = async () => {
    let stream = true;

    const response = await axios.post(
      `${import.meta.env.VITE_PROXY_OPENAI}/api/v1/chat/completions`,
      {
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          }
        ],
        model: 'gpt-4o',
        stream
      },
      {
        responseType: 'stream',
        headers: {
          provider: 'open-ai',
          mode: 'development'
        }
      }
    );

    if (stream) {
      for await (const chunk of response.data) {
        console.log(chunk);
      }
    } else {
      console.log(response.data);
    }
  };

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
          <div className='modal-action justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get AI Gen summary</h1>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <textarea
              className='textarea textarea-success w-full h-[300px]'
              placeholder='Magic happens here...'
            ></textarea>
            <button
              className='btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleGenAI}
            >
              Gen AI thingy
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
