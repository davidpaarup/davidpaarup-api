'use client';

import { useRef, useState } from 'react';
import { put, PutCommandOptions } from "@vercel/blob";
import '@/styles/global.css'

export default function ImageUploadPage() {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  const [password, setPassword] = useState<string>('');
  
  return (
    <>

    { !loggedIn &&
      <div className="flex">
         <form onSubmit={async (event) => {
            event.preventDefault();
            
            if (password === 'mydppass') {
              setLoggedIn(true);
            }
          }}>

          <div className="flex">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    }

    { loggedIn &&
      <div className="flex">
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];
            
            const options: PutCommandOptions = { 
              access: 'public', 
              token: process.env.NEXT_PUBLIC_TOKEN // TODO: is this public?
            }

            const result = await put(file.name, file, options)
            setUrl(result.url);
          }}
        >
          <div className="flex">
            <input name="file" ref={inputFileRef} type="file" required />
            <button type="submit">Upload</button>
          </div>
        </form>
        {url && (
          <div>
            Blob url: <a href={url}>{url}</a>
          </div>
        )}
        </div>
}
    </>
  );
}