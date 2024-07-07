import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import './Welcome.css';

const Fechingfilesfromrender = () => {
    const [files, setFiles] = useState([]);
    const [updateContent, setUpdateContent] = useState('');
    const [replyUpdate, setReplyUpdate] = useState('');
    const [replies, setReplies] = useState({});
    const [activeUpdateField, setActiveUpdateField] = useState(null);
    const [activeReplyField, setActiveReplyField] = useState(null);
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
        axios.get('http://localhost:5000/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    const fetchReplies = (filename) => {
        axios.get(`http://localhost:5000/files/${filename}/replies`)
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
        axios.delete(`http://localhost:5000/files/${filename}`)
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

    const updateFile = (filename, updatedContent) => {
        axios.put(`http://localhost:5000/files/${filename}`, { updatedContent })
            .then(response => {
                console.log(response.data);
                setFiles(prevFiles => 
                    prevFiles.map(file => 
                        file.filename === filename ? { ...file, description: updatedContent } : file
                    )
                );
                setActiveUpdateField(null);
            })
            .catch(error => {
                console.error('Error updating file:', error);
            });
    };

    const deleteReply = (filename) => {
        axios.delete(`http://localhost:5000/files/${filename}/replies`)
            .then(response => {
                console.log(response.data);
                setReplies(prevReplies => {
                    const newReplies = { ...prevReplies };
                    delete newReplies[filename];
                    return newReplies;
                });
            })
            .catch(error => {
                console.error('Error deleting reply:', error);
            });
    };

    const handleUpdateReply = (filename, updatedReply) => {
        axios.put(`http://localhost:5000/files/${filename}/replies`, { updatedReply })
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
        <div>
            <h1>Uploaded Files</h1>
            <input
        name="seaches"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Files"
      />
            <ul>
                {filteredFiles.map((file, index)  => (
                  
                    <li key={file.filename}>
                          <div className="bored">
                        <a href={`http://localhost:5000/upload/${file.filename}`} target="_blank" rel="noopener noreferrer">
                            {file.filename}
                        </a>
                        <p>{file.description}</p>
                        <button onClick={() => deleteFile(file.filename)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button onClick={() => setActiveUpdateField(file.filename)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        {activeUpdateField === file.filename && (
                            <>
                                <input 
                                    type="text" 
                                    placeholder="Update description" 
                                    value={updateContent} 
                                    onChange={(e) => setUpdateContent(e.target.value)} 
                                />
                                <button onClick={() => updateFile(file.filename, updateContent)}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </>
                        )}
                        <button onClick={() => setActiveReplyField(file.filename)}>
                            <FontAwesomeIcon icon={faReply} />
                        </button>
                        {activeReplyField === file.filename && (
                            <>
                                <input 
                                    type="text" 
                                    placeholder="Update reply" 
                                    value={replyUpdate} 
                                    onChange={(e) => setReplyUpdate(e.target.value)} 
                                />
                                <button onClick={() => handleUpdateReply(file.filename, replyUpdate)}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </>
                        )}
                        <button onClick={() => deleteReply(file.filename)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button onClick={() => fetchReplies(file.filename)}>Show Replies</button>
                        {replies[file.filename] && (
                            <ul>
                                {replies[file.filename].map((reply, index) => (
                                    <li key={index}>{reply}</li>
                                ))}
                            </ul>
                      
                        )}
                         </div>
                    </li>
                
                    ))}
            
            </ul>
        </div>
    );
};

export default Fechingfilesfromrender;
