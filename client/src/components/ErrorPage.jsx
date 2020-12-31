import React from 'react'
import { Link } from 'react-router-dom'
export default function ErrorPage() {
  return (
    <div style={{ color: "#f7f7f7" }}>
      <h1 className="text-center">You Broke It!!!!</h1>
      <p className="text-center"><button className="btn btn-outline-light"><Link to="/">GO HOME</Link></button></p>
    </div>
  )
}
