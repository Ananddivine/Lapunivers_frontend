import React, { useEffect, useState} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");
  const baseURL = 'http://localhost:5001';
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = files.filter(file => {
    const description = file.description || "";
    const filename = file.filename || "";
    const replies = file.replies || [];
    const replyTexts = replies.join(" ").toLowerCase(); 
    return (
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replyTexts.includes(searchQuery.toLowerCase())
    );
  });
  
 
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
    
      navigate('/Login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } 
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem('username');
      if (updatedUsername) {
        setUsername(updatedUsername);
      } 
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [username]);

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('uploadedFile', file);
    formData.append('description', description);

    try {
      await axios.post(`${baseURL}/upload`, formData);
      console.log('File uploaded successfully.');
      setUploadSuccess('File uploaded successfully.');

      setTimeout(() => {
        setUploadSuccess(null);
      }, 3000);

      setFile(null);
      setDescription("");
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error uploading file. Please try again.');

      setTimeout(() => {
        setUploadError(null);
      }, 3000);
    } finally {
      setUploading(false);

      axios.get(`${baseURL}/files`)
        .then(response => {
          setFiles(response.data);
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    axios.get(`${baseURL}/files`)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, [baseURL]);

  const handleReply = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].showReply = !updatedFiles[index].showReply;
    setFiles(updatedFiles);
  };
  
  const handleReplySubmit = (index, filename) => {
    if (files[index].replyText && files[index].replyText.trim() !== "") {
      // Prepend the username to the reply text
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
  
      const formData = new FormData();
      formData.append('reply', replyWithUsername);
      console.log('Form data:', formData);
  
      // Delay the POST request by a few milliseconds to allow time for the console logs to be displayed
      setTimeout(() => {
        axios.post(`${baseURL}/files/${filename}/replies`, replyWithUsername)
          .then(_response => {
            console.log('Reply submitted successfully:', replyWithUsername);
          })
          .catch(error => {
            console.error('Error submitting reply:', error);
          });
      }, 100);
    } else {
      alert("Please enter a reply.");
    }
  };
  
  
  useEffect(() => {
    axios.get(`${baseURL}/files`)
      .then(response => {
        setFiles(response.data);
        // Fetch reply text for each file
        response.data.forEach(file => {
          axios.get(`${baseURL}/files/${file.filename}/replies`)
            .then(replyResponse => {
              // Update files state with reply text
              setFiles(prevFiles => prevFiles.map(prevFile => {
                if (prevFile.filename === file.filename) {
                  return {
                    ...prevFile,
                    replies: replyResponse.data
                  };
                }
                return prevFile;
              }));
            })
            .catch(() => {
             
            });
        });
      })
      .catch(() => {
       
      });
  }, [baseURL]);

  return (
    <div className="welcome">
      <h1>{`WELCOME ${username}`}</h1>
      <p>Upload Bios File</p>
      <input style={{color: 'aqua'}} type="file" onChange={handleFileChange} disabled={uploading} />
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" disabled={uploading} />
      <button className="uploadbutton" onClick={handleUpload} disabled={uploading}>Upload File</button>
      {uploading && <div>Loading...</div>}
      {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
      {uploadSuccess && <div style={{ color: 'green' }}>{uploadSuccess}</div>}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Files"
      />
      <ul>
     
        {filteredFiles.map((file, index) => (
          <li key={index}>
            {!file.filename.endsWith('.txt') && (
                          
              <React.Fragment>
                 <div className="bored">
                 <p>{file.description}</p>
            {file.replies && (
              <ul style={{color: '#ccc'}}>
                {file.replies.map((reply, replyIndex) => (
                  <li key={replyIndex}>{reply}</li>
                ))}
              </ul>
            )}
                {file.showReply ? (
                  <div className="replycontainer">
                    <textarea
                      value={file.replyText || ""}
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index].replyText = e.target.value;
                        setFiles(updatedFiles);
                      }}
                      placeholder="Enter your reply..."
                    />
                    <button onClick={() => handleReplySubmit(index, file.filename)}>Submit</button>
                  </div>
                ) : (
                  <button className="buttonicon" onClick={() => handleReply(index)}>
                    <FontAwesomeIcon icon={faReply} className="icon" />
                  </button>
                )}
                <a href={`${baseURL}/upload/${file.filename}`} download target="_blank" rel="noopener noreferrer">
                  {file.filename}
                </a>     </div>
              </React.Fragment>
            )}
              
          </li>
       
        ))}
   
      </ul>
    </div>
  );
}

export default Welcome;