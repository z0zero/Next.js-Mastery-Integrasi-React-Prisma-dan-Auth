'use client';
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'

const UploadPage = () => {
  return (
    <CldUploadWidget uploadPreset='cqqrzuhb'>
      { ({ open }) => 
      <button 
        className='btn btn-primary'
        onClick={() => open()}>Upload files</button>}
    </CldUploadWidget>
  )
}

export default UploadPage