import BookService from '../components/books/BooksService';

export const helloWorld = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

export const getAllBooks = async () => {
  try {
    const allBooks = await BookService.getAllBooks();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: allBooks,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        message: error
      }),
    };
  }
};

export default {
  helloWorld,
  getAllBooks
};
