import React from 'react'

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'></span>
      </div>
      <h3 className='mt-3'>Loading...</h3>
      </div>
    </div>
  )
}
