import React from 'react';

export default function MiCuenta() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mi Cuenta</h1>
      <p>Bienvenido a tu cuenta.</p>
    </div>
    /*const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');

    // Fetch user details using userId
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any authorization headers if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Mi Cuenta</h1>
      {user ? (
        <div>
          <p>User ID: {user.id}</p>
          <p>User Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );*/
  );
}
