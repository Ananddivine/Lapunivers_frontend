import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fechingfilesfromrender = () => {
    const [files, setFiles] = useState([]);
    const [updateContent, setUpdateContent] = useState('');
    const [replyUpdate, setReplyUpdate] = useState('');
    const [replies, setReplies] = useState({});

    useEffect(() => {
        axios.get('https://backend-1-la1d.onrender.com/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    const fetchReplies = (filename) => {
        axios.get(`https://backend-1-la1d.onrender.com/files/${filename}/replies`)
            .then(response => {
                console.log(`Fetched replies for ${filename}:`, response.data); // Debug log
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
        axios.delete(`https://backend-1-la1d.onrender.com/files/${filename}`)
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
        axios.put(`https://backend-1-la1d.onrender.com/files/${filename}`, { updatedContent })
            .then(response => {
                console.log(response.data);
                setFiles(prevFiles => 
                    prevFiles.map(file => 
                        file.filename === filename ? { ...file, description: updatedContent } : file
                    )
                );
            })
            .catch(error => {
                console.error('Error updating file:', error);
            });
    };

    const deleteReply = (filename) => {
        axios.delete(`https://backend-1-la1d.onrender.com/files/${filename}/replies`)
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
        axios.put(`https://backend-1-la1d.onrender.com/files/${filename}/replies`, { updatedReply })
            .then(response => {
                console.log(response.data);
                fetchReplies(filename); // Refresh replies after update
            })
            .catch(error => {
                console.error('Error updating reply:', error);
            });
    };

    return (
        <div>
            <h1>Uploaded Files</h1>
            <ul>
                {files.map(file => (
                    <li key={file.filename}>
                        <a href={`https://backend-1-la1d.onrender.com/upload/${file.filename}`} target="_blank" rel="noopener noreferrer">
                            {file.filename}
                        </a>
                        <p>{file.description}</p>
                        <button onClick={() => deleteFile(file.filename)}>Delete File</button>
                        <input 
                            type="text" 
                            placeholder="Update description" 
                            value={updateContent} 
                            onChange={(e) => setUpdateContent(e.target.value)} 
                        />
                        <button onClick={() => updateFile(file.filename, updateContent)}>Update Description</button>
                        <input 
                            type="text" 
                            placeholder="Update reply" 
                            value={replyUpdate} 
                            onChange={(e) => setReplyUpdate(e.target.value)} 
                        />
                        <button onClick={() => handleUpdateReply(file.filename, replyUpdate)}>Update Reply</button>
                        <button onClick={() => deleteReply(file.filename)}>Delete Replies</button>
                        <button onClick={() => fetchReplies(file.filename)}>Show Replies</button>
                        {replies[file.filename] && (
                            <ul>
                                {replies[file.filename].map((reply, index) => (
                                    <li key={index}>{reply}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Fechingfilesfromrender;
