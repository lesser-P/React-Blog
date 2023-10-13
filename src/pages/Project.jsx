import { useState } from 'react'
import ProjectCompont from '../components/ProjectCompont'
function Project() {
  return (
    <>
      <div style={{ float: 'left', marginLeft: '16%', marginTop: '1%' }}>
        <div className='project_comp'>
          <ProjectCompont></ProjectCompont>
        </div>
      </div>
    </>
  )
}
export default Project
