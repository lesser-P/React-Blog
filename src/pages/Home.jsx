import { useState } from 'react'
import { Button } from 'antd'
import SnakeGame from '../components/SnakeGame'

function Home() {
  return (
    <>
      <div style={{ float: 'left', marginLeft: '16%', marginTop: '1%' }}>
        <div>
          <SnakeGame></SnakeGame>
        </div>
      </div>
    </>
  )
}
export default Home
