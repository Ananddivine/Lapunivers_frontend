import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import './Notify.css'

function Notifications() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const baseURL = 'https://backend-1-la1d.onrender.com';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (!storedUsername || !storedEmail) {
      navigate('/Login');
    } else {
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, [navigate]);

  useEffect(() => {
    if (username && email) {
      axios.get(`${baseURL}/files`)
        .then(response => {
          console.log('All files:', response.data); 
          const userFiles = response.data.filter(file => file.username === username && file.email === email);
          console.log('Filtered user files:', userFiles); 

          // Fetch replies for each file
          const fetchReplies = userFiles.map(file => (
            axios.get(`${baseURL}/files/${file.filename}/replies`)
          ));

          // Wait for all replies to resolve
          Promise.all(fetchReplies)
            .then(replyResponses => {
              const filesWithReplies = userFiles.map((file, index) => ({
                ...file,
                replies: replyResponses[index].data
              }));
              setFiles(filesWithReplies);
            })
            .catch(error => {
              console.error('Error fetching replies:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    }
  }, [baseURL, username, email]);

  const handleReplyToggle = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].showReply = !updatedFiles[index].showReply;
    setFiles(updatedFiles);
  };

  const handleReplySubmit = (index, filename) => {
    if (files[index].replyText && files[index].replyText.trim() !== "") {
      const replyWithUsername = `${username} :-  ${files[index].replyText}`;
      console.log('Reply text:', replyWithUsername);

      const updatedFiles = [...files];
      updatedFiles[index] = {
        ...updatedFiles[index],
        replies: updatedFiles[index].replies || [],
        replyText: "",
        showReply: false
      };
      updatedFiles[index].replies.push(replyWithUsername);
      console.log('Updated files:', updatedFiles);

      setFiles(updatedFiles);

      axios.post(`${baseURL}/files/${filename}/replies`, { reply: replyWithUsername })
        .then(_response => {
          console.log('Reply submitted successfully:', replyWithUsername);
        })
        .catch(error => {
          console.error('Error submitting reply:', error);
        });
    } else {
      alert("Please enter a reply.");
    }
  };

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <div className="file-item">
              <p>{file.description}</p>
              {file.replies && (
                <ul>
                  {file.replies.map((reply, replyIndex) => (
                    <li key={replyIndex}>{reply}</li>
                  ))}
                </ul>
              )}
              <a href={`${baseURL}/upload/${file.filename}`} download target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faMicrochip} className="ico" />  {file.filename}
              </a>
              <button  onClick={() => handleReplyToggle(index)} className="reply-button">
                Reply
              </button>
              {file.showReply && (
                <div className="reply-container">
                  <textarea
                    value={file.replyText || ""}
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index].replyText = e.target.value;
                      setFiles(updatedFiles);
                    }}
                    placeholder="Enter your reply..."
                  />
                  <button onClick={() => handleReplySubmit(index, file.filename)} className="submitreply">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
