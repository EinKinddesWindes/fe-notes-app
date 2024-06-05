import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/instructions.md');
        const data = await response.text();
        setInstructions(data);
      } catch (error) {
        console.error('Error fetching instructions', error);
      }
    })();
  }, []);

  const resources = [
    {
      id: 1,
      title: 'Open AI Proxy API',
      description:
        'WBS Coding School Open AI Proxy API project. This is the backend for the Open AI Proxy API.',
      url: 'https://github.com/WBSCodingSchool/open-ai-proxy'
    },
    {
      id: 2,
      title: 'Backend Notes App',
      description: 'WBS Coding School RESTful API for Notes app',
      url: 'https://github.com/WBSCodingSchool/be-notes-app'
    },
    {
      id: 3,
      title: 'Frontend Notes App',
      description: 'WBS Coding School frontend for Notes app',
      url: 'https://github.com/WBSCodingSchool/fe-notes-app'
    },
    {
      id: 4,
      title: 'Open AI API Documentation for Chat Completion',
      description: 'Open AI API Documentation for Chat Completion',
      url: 'https://platform.openai.com/docs/guides/text-generation'
    },
    {
      id: 5,
      title: 'Open AI API Reference',
      description: 'Open AI API Reference for Chat Completion API',
      url: 'https://platform.openai.com/docs/api-reference/introduction'
    },
    {
      id: 6,
      title: 'Open AI JSON Mode Documentation',
      description: 'Open AI JSON Mode Documentation for Chat Completion API',
      url: 'https://platform.openai.com/docs/guides/text-generation/json-mode'
    }
  ];

  return (
    <div className='container mx-auto mt-5'>
      <h1 className='text-2xl font-bold text-center'>Welcome to your Notes app</h1>
      <div className='mt-5 grid grid-cols-3 items-center gap-5'>
        {resources.map(({ description, id, title, url }) => (
          <div key={id} className='card bg-base-200 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>{title}</h2>
              <p>{description}</p>
              <div className='card-actions justify-end'>
                <a className='btn btn-primary' href={url}>
                  Go to resource
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id='instructions'>
        <ReactMarkdown>{instructions}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Home;
