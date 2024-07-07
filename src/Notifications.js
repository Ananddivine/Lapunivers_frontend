import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faReply, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import './Notify.css';

function Notifications() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [replyUpdate, setReplyUpdate] = useState('');
  const [replies, setReplies] = useState({});
  const [activeReplyField, setActiveReplyField] = useState(null);
  const navigate = useNavigate();
  const baseURL = 'https://backend-1-la1d.onrender.com';
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = files.filter(file => {
    const description = file.description || "";
    const filename = file.filename || "";
    const replyTexts = (replies[file.filename] || []).join(" ").toLowerCase();
    return (
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        replyTexts.includes(searchQuery.toLowerCase())
    );
});

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
          const userFiles = response.data.filter(file => file.username === username && file.email === email);
          setFiles(userFiles);
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    }
  }, [baseURL, username, email]);

  const fetchReplies = (filename) => {
    axios.get(`${baseURL}/files/${filename}/replies`)
      .then(response => {
        console.log(`Fetched replies for ${filename}:`, response.data);
        setReplies(prevReplies => ({
          ...prevReplies,
          [filename]: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching replies:', error);
      });
  };

  const deleteFile = (filename) => {
    axios.delete(`${baseURL}/files/${filename}`)
      .then(response => {
        console.log(response.data);
        setFiles(prevFiles => prevFiles.filter(file => file.filename !== filename));
        setReplies(prevReplies => {
          const newReplies = { ...prevReplies };
          delete newReplies[filename];
          return newReplies;
        });
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };


 

  const handleUpdateReply = (filename, updatedReply) => {
    axios.put(`${baseURL}/files/${filename}/replies`, { updatedReply })
      .then(response => {
        console.log(response.data);
        fetchReplies(filename);
        setActiveReplyField(null);
      })
      .catch(error => {
        console.error('Error updating reply:', error);
      });
  };

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <p>Hi {username} You Can Manage Your Uploaded Files And You can See If anyone Commant On Your File By Clicking The Show Replies Button </p>
      <input
        name="seaches"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Files"
      />
      <ul>
        {filteredFiles.map((file, index) => (
          <li key={file.filename}>
            <div className="file-item">
              <a href={`${baseURL}/upload/${file.filename}`} download target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faMicrochip} className="ico" />  {file.filename}
              </a>
              <p>{file.description}</p>
              <button className="buttons" onClick={() => deleteFile(file.filename)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete File
              </button>
             
             
              <button className="buttons" onClick={() => setActiveReplyField(file.filename)}>
                <FontAwesomeIcon icon={faReply} /> Edit Reply
              </button>
              {activeReplyField === file.filename && (
                <>
                  <input
                    type="text"
                    placeholder="Update reply"
                    value={replyUpdate}
                    onChange={(e) => setReplyUpdate(e.target.value)}
                  />
                  <button className="buttons" onClick={() => handleUpdateReply(file.filename, replyUpdate)}>
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                </>
              )}
              <button className="buttons" onClick={() => fetchReplies(file.filename)}>Show Replies</button>
              {replies[file.filename] && (
                <ul>
                  {replies[file.filename].map((reply, replyIndex) => (
                    <li key={replyIndex}>{reply}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
