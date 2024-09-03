
import { useEffect, useState } from 'react';
import { fetchUserDetails } from '../api/stockAPI'; 

const UserDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchDetails();
  }, []);

  if (!user) return null;

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>User Details</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;
