import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { StageSpinner } from "react-spinners-kit";
import Swal from 'sweetalert2';
import apiEndpoint from 'config/apiEndpoint';

interface User {
  name: string,
  photo: string
}
interface Message {
  user: User,
  message: string,
}

function App() {
  const [newMessage, setNewMessage] = useState('');
  const [lastString, setLastString] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = React.createRef<HTMLDivElement>()

  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const sendRequest = async (messagesString: string) => {
    setNewMessage("");
    const body = {
      messages: messagesString,
    };
    const data = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      cache: 'no-cache' as RequestCache,
      credentials: 'same-origin' as RequestCredentials,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body)
    };
    const endpoint = 'public/message';
    const URI = `${apiEndpoint}/${endpoint}`;
    await fetch(URI, data)
      .then((response) => {
        if (response.ok) {
          return (response.json())
        }
      })
      .then((responseJson) => {
        const aiResponse = responseJson.openAIResponse;
        console.log(aiResponse);
        const newMessages = [...messages, {
          user: {
            name: 'Luis GPT',
            photo: 'https://avatars.githubusercontent.com/u/41268365?v=4',
          },
          message: aiResponse,
        }];
        setMessages(newMessages);
        const messagesString = `${lastString} ${aiResponse}`;
        setLastString(messagesString);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Try again later',
          showConfirmButton: false,
          timer: 3000,
        })
      })
    setIsSending(false);
    scrollToBottom();
  }

  const handleSendMessage = () => {
    const newMessages = [...messages, {
      user: {
        name: 'You',
        photo: 'https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg', //https://avatars.githubusercontent.com/u/41268365?v=4
      },
      message: newMessage,
    }];
    setMessages(newMessages);
    const messagesString = `${lastString} \n ${newMessage}`;
    setLastString(messagesString);
    setIsSending(true);

  }

  useEffect(() => {
    if (isSending === true) {
      scrollToBottom();
      sendRequest(lastString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSending])

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
  }

  return (
    <div className='flex flex-col md:flex-row items-start justify-center max-w-full box-border h-screen md:h-auto'>
      <aside className='bg-obscure-500 w-full md:w-1/4 md:h-screen text-white p-5'>
        <div className='mb-5'>Hi, my name is Luis and I am a Software Engineer. I created this version of ChatGPT using the OpenAI API via NodeJS and React. Ask whatever you want! If you want to support my work you can donate here:</div>
        <a className='w-full border-white border-2 border-solid rounded p-2 flex items-center justify-start hover:bg-obscure-100' href="https://buy.stripe.com/fZe15j3xDbbhexG5kl"><FontAwesomeIcon icon={faHandHoldingDollar} className='pr-4' /> Donate</a>
      </aside>
      <section className='bg-obscure-100 w-full h-full  md:w-3/4 md:h-screen p-5 text-white relative	flex justify-start	items-between flex-col'>
        <div className='flex flex-col overflow-y-scroll'>
          {messages.map((message, idx) => {
            return (
              <div key={idx} className='flex  flex-row items-center justify-start bg-obscure-500 border border-y-sky-50 p-5 rounded-md mb-3'>
                <img alt="Guest" src={message.user.photo} className='w-10 h-10 rounded-full mr-3' /><div>{message.message}</div>
              </div>
            )
          })}
          {isSending && <StageSpinner color={"#FFFFFF"} />}
          <div ref={messagesEndRef} />
        </div>
        <div className='mt-auto w-full flex'>
          <textarea className='rounded w-full text-white px-3 pt-3 focus:outline-none bg-obscure-100 shadow-lg shadow-obscure-500/50' onChange={handleChangeMessage} />
          <button disabled={isSending} className='w-14 ml-2 border-white border-2 border-solid flex items-center justify-center rounded' onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>
      </section>
    </div>

  );
}

export default App;
