import React from 'react';
import { Card } from 'react-bootstrap';

function Home({ darkMode }) {
  return (
    <Card bg={darkMode ? 'dark' : 'light'} text={darkMode ? 'light' : 'dark'}>
      <Card.Body>
        <Card.Title>Welcome to Solana Checker</Card.Title>
        <Card.Text>
          This is a simple Solana wallet balance checker application.
          Use the navigation bar to visit the Check Balance page where you can:
          <ul>
            <li>Enter a Solana wallet address</li>
            <li>View the current SOL balance</li>
          </ul>
          The app connects to the Solana mainnet using the official Solana Web3.js library.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Home;