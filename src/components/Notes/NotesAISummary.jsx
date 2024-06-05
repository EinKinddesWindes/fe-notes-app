import { useRef, useState } from 'react';
import axios from 'axios';

const NotesAISummary = ({ notes }) => {
  const modalRef = useRef();
  const [aiNotes, setAiNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenAI = async () => {
    try {
      setLoading(true);
      let stream = true;
      const response = await axios.post(
        `${import.meta.env.VITE_PROXY_OPENAI}/api/v1/chat/completions`,
        {
          messages: [
            {
              role: 'system',
              content:
                'You are a student in a coding bootcamp. You will receive some notes about topics reviewed in class and you will summarise them and return a bullet list. Respond with a  JSON array with objects with a title and summary properties '
            },
            {
              role: 'user',
              content: JSON.stringify(notes)
            }
          ],
          response_format: {
            type: 'json_object'
          },
          model: 'gpt-3.5-turbo',
          stream
        },
        {
          headers: {
            provider: 'open-ai',
            mode: 'production'
          }
        }
      );

      if (stream) {
        for await (const chunk of response.data) {
          console.log(chunk);
        }
      } else {
        setAiNotes(JSON.parse(response.data?.message.content).topics || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
            <div
              className='textarea textarea-success w-full h-[300px] overflow-y-scroll'
              placeholder='Magic happens here...'
            >
              {aiNotes.map(n => {
                return (
                  <div key={n.title}>
                    <h2 className='text-lg font-bold'>{n.title}</h2>
                    <p>{n.summary}</p>
                  </div>
                );
              })}
            </div>
            <button
              className='btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleGenAI}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Generating summary
                </>
              ) : (
                'Gen AI summary ✨'
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
