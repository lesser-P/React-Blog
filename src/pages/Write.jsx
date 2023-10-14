import { useState } from 'react'
import WriteCompont from '../components/WriteCompont'
function Write() {
  return (
    <>
      <div style={{ float: 'left', marginLeft: '16%', marginTop: '1%' }}>
        <div className='write_comp'>
          <WriteCompont></WriteCompont>
        </div>
      </div>
    </>
  )
}
export default Write
