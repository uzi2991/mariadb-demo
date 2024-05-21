import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch notifications data from the backend
    const fetchNotifications = async () => {
      try {
        console.log('Hi');
        const response = await axios.get('/api/users/notifications'); // Replace with your backend API endpoint
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array to run effect only once on component mount

  const handleNotificationView = async (notificationId) => {
    try {
      await axios.post(`/api/users/notifications/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return (
    <div className="notification-component">
      <button onClick={handleNotificationClick} className="notification-button">
        <i className="fa-regular fa-bell"></i>{' '}
        {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="notification-popover">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.is_read ? 'unread' : ''
              }`}
            >
              <h4>{notification.content}</h4>
              <p>{moment(notification.date).fromNow()}</p>
              <Link
                to={notification.url}
                onClick={() => handleNotificationView(notification.id)}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
