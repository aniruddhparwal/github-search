import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import UserInfo from './UserInfo';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    setLoading(true);
    console.log("searchUsers");
    if (searchTerm === '') {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&sort=followers`);
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error fetching GitHub users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const debounceId = setTimeout(() => {
      searchUsers();
    }, 600);

    return () => {
      clearTimeout(debounceId);
    };
  }, [searchTerm]);

  return (
    <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(to right, #f2f2f2, #ffffff)' }}>
      <SearchForm searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
      {loading && <p style={{ marginTop: '20px', fontSize: '18px' }}>Loading...</p>}
      {searchResults.length > 0 && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent:'center'}}>Profile Photo</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>User Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Followers</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Profile</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <UserInfo key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
