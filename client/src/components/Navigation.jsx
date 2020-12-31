import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import './Navigation.css'
export default function Navigation() {
  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand style={{ fontWeight: "bold" }}><Link to={{ pathname: "/" }}><span style={{ color: "#BB86FC" }}>Bit</span>Site</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Link to={{ pathname: '/stocks' }}><span className="mx-1">STOCKS</span></Link>
            <Link to={{ pathname: '/articles' }}><span className="mx-1">ARTICLES</span></Link>
            <Link to={{ pathname: '/videos' }}><span className="mx-1">VIDEOS</span></Link>
            <Link to={{ pathname: '/courses' }}><span className="mx-1">COURSES</span></Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}
