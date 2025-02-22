import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import BalanceChecker from './pages/BalanceChecker';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} style={{ minHeight: '100vh' }}>
        <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Solana Checker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/check">Check Balance</Nav.Link>
              </Nav>
              <Button 
                variant={darkMode ? 'outline-light' : 'outline-dark'}
                onClick={toggleDarkMode}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/check" element={<BalanceChecker darkMode={darkMode} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;