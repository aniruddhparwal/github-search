import React, { useState } from 'react';
import axios from 'axios';

const UserInfo = ({ user }) => {
  const [followerCount, setFollowerCount] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleMouseEnter = async () => {
    setIsFetching(true);
    setIsHovered(true);
    if (!followerCount) {
      const count = await fetchFollowerCount(user.login);
      setFollowerCount(count);
    }
  };

  const fetchFollowerCount = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data.followers;
    } catch (error) {
      console.error('Error fetching follower count:', error);
      return null;
    }
  };

  return (
    <tr>
      <td style={{display: 'flex', justifyContent:'center'}}>
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      </td>
      <td>{user.login}</td>
      <td>
        <div
        >
          {isHovered ? (
            <div
            >
              Followers: {followerCount !== null ? followerCount : 'Loading...'}
            </div>
          ) : 
          isFetching ? (<div>Loading...</div>) : (<div onMouseEnter={handleMouseEnter}>Hover over me</div>)
            }
        </div>
      </td>
      <td>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </td>
    </tr>
  );
};

export default UserInfo;
