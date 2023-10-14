import { useState } from 'react'
import '../css/projectComp.css'
import { IeOutlined, GithubOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
const { Meta } = Card

const list = [
  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },
  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },
  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },
  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },

  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },
  {
    title: 'fish',
    description: 'hahaha',
    url: '/#',
    imgUrl: '../assets/fishNfT.png',
  },
]

const ProjectItem = () => {
  const handleGitClick = () => {}
  const handleWebClick = () => {
    window.open('https://fish-dapp.4everland.app/#/home', '_blank')
  }
  return (
    <Card
      onClick={handleWebClick}
      hoverable='true'
      className='project_card'
      cover={<img style={{ width: '90%', margin: '1px 1px' }} src='src/assets/fishNFT.png' />}
      actions={[<GithubOutlined onClick={handleGitClick} key='github' />, <IeOutlined onClick={handleWebClick} key='website' />]}
    >
      <Meta avatar={<Avatar src='src/assets/fishNFT.png' />} title={list[0].title} description={list[0].description} />
    </Card>
  )
}

function ProjectCompont() {
  return (
    <>
      <div className='project_main'>
        <div className='project_item'>
          {list.map((item) => (
            <ProjectItem item={item}></ProjectItem>
          ))}
        </div>
      </div>
    </>
  )
}
export default ProjectCompont
