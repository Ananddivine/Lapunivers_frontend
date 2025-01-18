import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faSearch  } from '@fortawesome/free-solid-svg-icons';
import './Css/Welcome.css';

const Welcome = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]); // Track filtered issues based on search query
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [openReplyBox, setOpenReplyBox] = useState(null); // Track open reply box
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const navigate = useNavigate();

  if (success) {
    toast.success(success);
    setSuccess(null);
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  if (error) {
    toast.error(error);
    setError(null); // Clear the error after showing
  }

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/issues');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIssues(data);
        setFilteredIssues(data); // Set initial filtered issues to all issues
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
    }
  }, []);

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
    if (!checkLoginStatus()) return;

    setLoading(true); // Start loading
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
      setFilteredIssues(response.data); // Reset filtered issues after posting
      toast.success('Issue successfully posted');
    } catch (err) {
      toast.error('Error posting your issue!');
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleReply = async (issueId) => {
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
      toast.success('You have successfully submitted the reply');
    } catch (err) {
      toast.error('Error sending reply');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const toggleReplyBox = (issueId) => {
    setOpenReplyBox(openReplyBox === issueId ? null : issueId);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    // Filter issues based on title and description
    const filtered = issues.filter((issue) => {
      // Check if the issue title or description matches
      const issueMatch =
        issue.title.toLowerCase().includes(query) || issue.description.toLowerCase().includes(query);
  
      // Check if any of the replies match the query
      const replyMatch = issue.replies && issue.replies.some((reply) => reply.message.toLowerCase().includes(query));
  
      // Return true if either the issue or any reply matches
      return issueMatch || replyMatch;
    });
  
    setFilteredIssues(filtered);
  };
  

  return (
    <div className="welcome container mx-auto p-4">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-50">Welcome!</h1>
      <p className="mt-4">You can start posting your issues below or reply to existing threads.</p>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="     Search issues..."
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>



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

          <button type="submit" className="btn btn-primary">
            Post Issue
          </button>
        </form>
      )}

      <h2 className="mt-8 text-2xl font-semibold">Existing Issues</h2>
      <div className="mt-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div key={issue._id} className="border text-white border-gray-300 p-4 mb-4 rounded">
              <h3 className="text-gray-300 font-bold">{issue.title}</h3>
              <p>{issue.description}</p>
              <p className="text-sm text-gray-600">Posted by: {issue.username || 'Unknown'}</p>

              {issue.attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold text-white">Attachments:</h4>
                  <div className="attachments-container">
                    {issue.attachments.map((attachment, index) => (
                      <a className="file-attachments" href={attachment} target="_blank" rel="noopener noreferrer">
                        Click here to View
                      </a>
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

              <button onClick={() => toggleReplyBox(issue._id)} className="btn btn-primary">
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
                  <button onClick={() => handleReply(issue._id)} className="btn btn-primary">
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
