export function getPayloadFromToken(token) {
    if (!token) return null;
  
    const tokenParts = token.split('.');
    
    if (tokenParts.length < 2) return null; // Check if token is a valid JWT
    
    try {
      // Decode the payload (second part)
      const base64Payload = tokenParts[1];
      const payload = JSON.parse(atob(base64Payload)); // Decode from Base64 and parse JSON
  
      return payload; // Returns the payload containing userId and other data
    } catch (error) {
      console.error('Failed to decode token payload:', error);
      return null;
    }
  }
  

export function addTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `${token}`;
    }
    return headers;
}


  