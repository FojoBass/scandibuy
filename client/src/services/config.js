const baseUrl = 'https://scandibuyserver.vercel.app/graphql';

const fetchFunc = async (query, variables = null) => {
  try {
    const body = JSON.stringify({
      query,
      variables,
    });

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map((error) => error.message).join(', '));
    }

    return result.data;
  } catch (error) {
    console.error('Error in fetchFunc:', error);
    throw error;
  }
};

export default fetchFunc;
