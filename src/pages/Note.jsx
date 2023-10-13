import { useState } from 'react'
import NoteCompont from '../components/NoteCompont'
function Note() {
  return (
    <>
      <div style={{ float: 'left', marginLeft: '16%', marginTop: '1%' }}>
        <div className='note_comp'>
          <NoteCompont></NoteCompont>
        </div>
      </div>
    </>
  )
}
export default Note
