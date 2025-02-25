import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFilePdf, faFileArchive, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../Notification/Notification.css'
import axiosInstance from '../axiosInstance/axiosInstance'; // Import the axiosInstance


const Notification = () => {
  const [userIssues, setUserIssues] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserIssues = async () => {
      const token = localStorage.getItem('auth-token');
  
      if (!token) {
        navigate('/login'); // Redirect if token is not present
        return;
      }
  
      try {
        const response = await axiosInstance.get('/api/issues/user-issues', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        });
  
        // Sort issues by isRead status, unread first
        const sortedIssues = response.data.sort((a, b) => a.isRead - b.isRead);
        setUserIssues(sortedIssues); // Update state with sorted issues
      } catch (error) {
        console.error('Error fetching user issues:', error);
        setError(error.response ? error.response.data.message : 'Error fetching issues');
      }
    };
  
    fetchUserIssues();
  }, [navigate]);
  

  const deleteIssue = async (issueId) => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      // Handle case where token is not present
      return;
    }

    try {
      await axiosInstance.delete(`/api/issues/issue/${issueId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      });
      // Remove the deleted issue from the state
      setUserIssues(userIssues.filter(issue => issue._id !== issueId));
    } catch (error) {
      console.error('Error deleting issue:', error);
      setError(error.response ? error.response.data.message : 'Error deleting issue');
    }
  };

  return (
    <div className="notification container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-50">Your Notifications</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
      {userIssues.length > 0 ? (
  userIssues.map(issue => (
    <div
      key={issue._id}
      className={`border text-white border-gray-300 p-4 mb-4 rounded ${issue.isRead ? 'bg-gray-800' : 'bg-blue-600'}`} // Mark unread issues
    >
      <h3 className="text-gray-300 font-bold">{issue.title}</h3>
      <p>{issue.description}</p>
      <p className="text-sm text-gray-600">Posted by: {issue.username || 'Unknown'}</p>

      {/* Display replies */}
      {issue.replies && issue.replies.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-white">Replies:</h4>
          <ul className="space-y-2">
            {issue.replies.map((reply, index) => (
              <li key={index} className="text-gray-300">
                <p>{reply.message}</p>
                <p className="text-xs text-gray-600">Replied by: {reply.username}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {issue.attachments.length > 0 && (
        <div className="mt-2">
          <h4 className="font-semibold text-white">Attachments:</h4>
          <div className="attachments-container">
            {issue.attachments.map((attachment, index) => (
              <li key={index} className="flex items-center gap-2">
                {renderAttachment(attachment)}
                <a
                  className="file-attachments"
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 click to view
                </a>
              </li>
            ))}
          </div>
        </div>
      )}

      {/* Delete Button */}
      <button
        className="mt-2 bg-red-600 text-black px-4 py-2 rounded"
        id='notify-button'
        onClick={() => deleteIssue(issue._id)}
      >
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        Delete
      </button>
    </div>
  ))
) : (
  <p>You have not uploaded any issues yet.</p>
)}
      </div>
    </div>
  );
};

// Helper function to render attachments
const renderAttachment = (attachment) => {
  const extension = attachment.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension);

  if (isImage) {
    return <img src={attachment} alt="Attachment" className="attachment-image" />;
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

export default Notification;
