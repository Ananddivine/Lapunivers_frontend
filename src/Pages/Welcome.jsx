import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faFileAlt, faFilePdf, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import './Css/Welcome.css';

const Welcome = () => {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [openReplyBox, setOpenReplyBox] = useState(null); // Track open reply box
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [success, setSuccess] = useState(null);

  if (success) {
    toast.success(success)
    setSuccess(null)
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  if (error) {
    toast.error(error);
    setError(null); // Clear the error after showing
  }
  
 // Manage form visibility
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/issues');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setError(error.message);
        toast.error(error.message);
      }
    };

    fetchIssues();
  }, [navigate]);

  useEffect(() => {
    const tokenExpiryTime = localStorage.getItem('token-expiry');
    const currentTime = new Date().getTime();

    if (!tokenExpiryTime || currentTime > tokenExpiryTime) {
      localStorage.clear();
      toast.error('Session expired. Please log in again.');
      // window.location.href = '/login';
    }
  }, []);

    // Check if the user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem('auth-token');
      const username = localStorage.getItem('username');
  
      if (!token || !username) {
        toast.error('Please log in first.');
        navigate('/login');
        return false;
      }
      return true;
    };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in before submitting
    if (!checkLoginStatus()) return;

    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      await axios.post('https://lapuniversbackend-production.up.railway.app/api/issues', formData, config);

      setTitle('');
      setDescription('');
      setAttachments([]);
      const response = await axios.get('https://lapuniversbackend-production.up.railway.app/api/issues', config);
      setIssues(response.data);
      toast.success('issue successfully posted')
    } catch (err) {
      toast.error('Error posting your issue');
      console.error(err);
    }
  };

  const handleReply = async (issueId) => {
    // Check if the user is logged in before replying
    if (!checkLoginStatus()) return;

    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `https://lapuniversbackend-production.up.railway.app/api/issues/${issueId}/reply`,
        { message: replyMessage },
        config
      );

      setReplyMessage('');
      setOpenReplyBox(null); // Close the reply box after submitting
      setIssues((prevIssues) =>
        prevIssues.map((issue) => (issue._id === issueId ? response.data : issue))
      );
      toast.success('You have successfully submited the reply')
    } catch (err) {
      toast.error('Error sending reply');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  }

  const toggleReplyBox = (issueId) => {
    setOpenReplyBox(openReplyBox === issueId ? null : issueId);
  };

  const renderAttachment = (attachment) => {
    const extension = attachment.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  
    if (isImage) {
      return (
        <img 
          src={attachment} 
          alt="Attachment" 
          className="attachment-image" // Apply the CSS class here
        />
      );
    } else if (extension === 'pdf') {
      return <FontAwesomeIcon icon={faFilePdf} className="text-red-600 w-6 h-6" />;
    } else if (['doc', 'docx', 'txt'].includes(extension)) {
      return <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 w-6 h-6" />;
    } else if (['zip', 'rar'].includes(extension)) {
      return <FontAwesomeIcon icon={faFileArchive} className="text-green-600 w-6 h-6" />;
    } else {
      return <FontAwesomeIcon icon={faFileAlt} className="text-gray-100 w-6 h-6" />;
    }
  };
  
  return (
    <div className="welcome container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-50">Welcome!</h1>
      <p className="mt-4">You can start posting your issues below or reply to existing threads.</p>

      {/* Toggle form button */}
      <button onClick={toggleForm} className="btn btn-secondary">
        {isFormOpen ? 'Cancel' : 'Post Issue'}
      </button>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            required
          ></textarea>
          
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <div className="mb-4">
            {attachments.length > 0 && (
              <p className="text-gray-600">Selected files: {attachments.map((file) => file.name).join(', ')}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Post Issue
          </button>
        </form>
      )}

      <h2 className="mt-8 text-2xl font-semibold">Existing Issues</h2>
      <div className="mt-4">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue._id} className="border text-white border-gray-300 p-4 mb-4 rounded">
              <h3 className="text-gray-300 font-bold">{issue.title}</h3>
              <p>{issue.description}</p>
              <p className="text-sm text-gray-600">Posted by: {issue.username || 'Unknown'}</p>

              {issue.attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold text-white">Attachments:</h4>
                  <div className="attachments-container">
                    {issue.attachments.map((attachment, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {renderAttachment(attachment)}
                        <a className='file-attachments' href={attachment} target="_blank" rel="noopener noreferrer">  Click here to View</a>
                      </li>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-semibold">Replies:</h4>
                {issue.replies && issue.replies.length > 0 ? (
                  issue.replies.map((reply, index) => (
                    <div key={index} className="p-2 border border-gray-500 rounded mt-2">
                      <p>{reply.message}</p>
                      <p className="text-sm text-gray-600">Replied by: {reply.username}</p>
                    </div>
                  ))
                ) : (
                  <p>No replies yet</p>
                )}
              </div>

              <button
                onClick={() => toggleReplyBox(issue._id)}
                class="btn btn-primary"
              >
                <FontAwesomeIcon icon={faReply} /> Reply
              </button>

              {openReplyBox === issue._id && (
                <div className="mt-2">
                  <textarea
                    placeholder="Write your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  <button
                    onClick={() => handleReply(issue._id)}
                  class="btn btn-primary"
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No issues posted yet.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Welcome;
