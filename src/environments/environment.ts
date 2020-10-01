const dev = {
  GOOGLE_CLIENT_ID: '1059930658367-0g2gr8h3s249gpcqnd4j16vubh1ebk08.apps.googleusercontent.com',
  // API_URL: 'http://localhost:4000',
  API_URL: 'https://vbravo-express.herokuapp.com',
};

const prod = {
  GOOGLE_CLIENT_ID: '1059930658367-0g2gr8h3s249gpcqnd4j16vubh1ebk08.apps.googleusercontent.com',
  API_URL: 'https://vbravo-express.herokuapp.com',
};

export default process.env.NODE_ENV !== 'production' ? dev : prod;
