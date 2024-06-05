import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Charts } from '@/components/Diary';

const MoodAIAnalysis = ({ entries }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resultsRef.current.scrollTo(0, resultsRef.current.scrollHeight);
  }, [aiSummary]);

  const handleGenAI = async () => {
    try {
      setLoading(true);
      setAiSummary('');
      const response = await fetch(`${import.meta.env.VITE_PROXY_OPENAI}/api/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode: 'production',
          provider: 'open-ai'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an helpful assistant'
            },
            {
              role: 'user',
              content: 'Give me a poem about coding in the style of Edgar Allan Poe'
            }
          ],
          model: 'gpt-3.5-turbo'
        })
      });

      // Get the response as JSON
      const data = await response.json();
      // Update the state
      setAiSummary(data.message?.content);
      console.log(data.message?.content);
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
        <div className='modal-box h-[600px] py-0 w-11/12 max-w-5xl'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get your AI Gen Mood Analysis</h1>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'
              ref={resultsRef}
            >
              <ReactMarkdown>{aiSummary}</ReactMarkdown>
            </div>
            <div className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'>
              <Charts aiSummary={aiSummary} />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleGenAI}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Generating mood analysis...
                </>
              ) : (
                'Gen AI mood analysis ✨'
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MoodAIAnalysis;
