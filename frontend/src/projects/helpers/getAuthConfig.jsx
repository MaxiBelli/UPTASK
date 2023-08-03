const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };
  
  export { getAuthConfig };
 
  

  
  
  
  
  