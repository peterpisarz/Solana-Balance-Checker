import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

function BalanceChecker({ darkMode }) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBalance = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setBalance(null);
    setLoading(true);

    try {
      console.log('Connecting to Solana...');
      const connection = new Connection(`https://rough-smart-reel.solana-mainnet.quiknode.pro/${process.env.REACT_APP_QUICKNODE_API}/`);
      console.log("Slot: ", await connection.getSlot());

      const publicKey = new PublicKey(address);
      console.log(`publicKey: ${publicKey}`)

      const blockHeight = await connection.getBlockHeight()
      console.log(`Block height: ${blockHeight}`)

      const lamports = await connection.getBalance(publicKey);
      console.log(`lamports: ${lamports}`)

      const sol = lamports / LAMPORTS_PER_SOL;
      console.log(`sol: ${sol}`)
      
      setBalance(sol);
    } catch (err) {
      if (err.message && err.message.includes('Invalid public key')) {
        setError('Invalid Solana address. Please check the address format and try again.');
      } else if (err.message && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again later.');
      } else if (err.message && err.message.includes('403')) {
        setError('Access forbidden. Please try again later or use a different RPC endpoint.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <Card bg={darkMode ? 'dark' : 'light'} text={darkMode ? 'light' : 'dark'}>
      <Card.Body>
        <Card.Title>Check Solana Balance</Card.Title>
        <Form onSubmit={checkBalance}>
          <Form.Group className="mb-3">
            <Form.Label>Solana Wallet Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Solana address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check Balance'}
          </Button>
        </Form>

        {balance !== null && (
          <Alert variant="success" className="mt-3">
            Balance: {balance} SOL
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default BalanceChecker;