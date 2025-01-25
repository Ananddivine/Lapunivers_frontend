import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../Components/axiosInstance/axiosInstance';
import './Css/Welcome.css';

const Welcome = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [replyMessages, setReplyMessages] = useState({}); // Track reply messages for each issue
  const [openReplyBox, setOpenReplyBox] = useState(null);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    setError(null);
  }

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axiosInstance.get('/api/issues');
        setIssues(response.data);
        setFilteredIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Error fetching issues');
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

    setLoading(true);
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

      await axiosInstance.post('/api/issues', formData, config);

      setTitle('');
      setDescription('');
      setAttachments([]);
      const response = await axiosInstance.get('/api/issues', config);
      setIssues(response.data);
      setFilteredIssues(response.data);
      toast.success('Issue successfully posted');
    } catch (err) {
      toast.error('Error posting your issue!');
      console.error(err);
    } finally {
      setLoading(false);
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

      await axiosInstance.post(
        `/api/issues/${issueId}/reply`,
        { message: replyMessages[issueId] }, // Use the reply message for the specific issue
        config
      );

      setReplyMessages((prevState) => ({ ...prevState, [issueId]: '' })); // Clear the reply input for this issue
      setOpenReplyBox(null);

      const response = await axiosInstance.get('/api/issues', config);
      setIssues(response.data);
      setFilteredIssues(response.data);

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

    const filtered = issues.filter((issue) => {
      const issueMatch =
        issue.title.toLowerCase().includes(query) || issue.description.toLowerCase().includes(query);

      const replyMatch = issue.replies && issue.replies.some((reply) => reply.message.toLowerCase().includes(query));

      return issueMatch || replyMatch;
    });

    setFilteredIssues(filtered);
  };

  const handleReplyMessageChange = (e, issueId) => {
    setReplyMessages((prevState) => ({
      ...prevState,
      [issueId]: e.target.value,
    }));
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
          placeholder=" &#128269;  Search issues..."
          className="search-input"
        />
        
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
                      <a
                        className="file-attachments"
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
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
                    <div key={reply._id || index} className="p-2 border border-gray-500 rounded mt-2">
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
                    value={replyMessages[issue._id] || ''}
                    onChange={(e) => handleReplyMessageChange(e, issue._id)} // Change reply for specific issue
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
