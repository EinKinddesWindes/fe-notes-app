import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const NotesAISummary = ({ notes }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [stream, setStream] = useState(false);
  const [aiNotes, setAiNotes] = useState('Generate your summary');
  const [loading, setLoading] = useState(false);

  const handleGenAI = async () => {
    try {
      setLoading(true);
      setAiNotes('');
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
              content:
                'You are an instructor in a coding bootcamp. You will receive some notes about topics reviewed in class and you will summarise them and return a bullet list. Respond with markdown using the title of each note as a header and the summary as a bullet list with your own words plus useful advice.'
            },
            {
              role: 'user',
              content: JSON.stringify(notes)
            }
          ],
          model: 'gpt-3.5-turbo',
          stream
        })
      });

      if (stream) {
        // Get the response as a stream
        const reader = response.body.getReader();
        // Create a new TextDecoder
        const decoder = new TextDecoder('utf-8');
        // Read the stream
        let result = '';
        // While the stream is not closed
        while (!(result = await reader.read()).done) {
          // Decode the result
          const chunk = decoder.decode(result.value, { stream });
          // Split lines by new line
          const lines = chunk.split('\n');
          // Loop through each line
          lines.forEach(line => {
            // Check if the line starts with data:
            if (line.startsWith('data:')) {
              // Get the JSON string without the data: prefix
              const jsonStr = line.replace('data:', '');
              // Parse the JSON string
              const data = JSON.parse(jsonStr);
              // Get the content from the first choice
              const content = data.choices[0]?.delta?.content;
              // If there is content
              if (content) {
                // Update the state
                setAiNotes(prev => {
                  return prev + content;
                });
                // Scroll to the bottom
                resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
              }
            }
          });
        }
      } else {
        // Get the response as JSON
        const data = await response.json();
        // Update the state
        setAiNotes(data.message?.content);
        // Scroll to the bottom
        resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
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
        <div className='modal-box h-[600px] py-0'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get AI Gen summary</h1>
            <label htmlFor='Stream?' className='flex items-center gap-1'>
              Stream?
              <input
                disabled={loading}
                id='Stream?'
                type='checkbox'
                className='toggle toggle-error'
                checked={stream}
                onChange={() => setStream(p => !p)}
              />
            </label>

            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div
              className='textarea textarea-success w-full h-[400px] overflow-y-scroll'
              ref={resultsRef}
            >
              <ReactMarkdown>{aiNotes}</ReactMarkdown>
            </div>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
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
