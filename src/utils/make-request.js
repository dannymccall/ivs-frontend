export async function makeRequest(url, method, data, service) {
  try {
    const response = await fetch(url, {
      
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Service": service,
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error; // Re-throw the error after logging it
  }
}

export const url = "http://localhost/IVS";
