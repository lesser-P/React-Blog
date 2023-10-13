// 个人介绍
import { useState } from 'react'
import { Image, Divider, Space, Button, Tag, Modal } from 'antd'
import '../css/SideBar.css'
import path from '../assets/king.png'
import { WechatOutlined, TwitterOutlined, GithubOutlined } from '@ant-design/icons'
function SideBar() {
  const list = [
    'https://img.shields.io/badge/Solidity-363636?logo=solidity&style=for-the-badge',
    'https://img.shields.io/badge/Ethers.js-6654F1?logo=ethereum&style=for-the-badge',
    'https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&style=for-the-badge',
    'https://img.shields.io/badge/Node.js-43853D?logo=node.js&style=for-the-badge',
    'https://img.shields.io/badge/Java-007396?logo=java&style=for-the-badge',
    'https://img.shields.io/badge/Spring-6DB33F?logo=spring&style=for-the-badge',
    'https://img.shields.io/badge/Redis-DC382D?logo=redis&style=for-the-badge',
    'https://img.shields.io/badge/React-61DAFB?logo=react&style=for-the-badge',
    'https://img.shields.io/badge/HTML5-FF5733?logo=html5&style=for-the-badge',
    'https://img.shields.io/badge/CSS-2965F1?logo=css3&style=for-the-badge',
  ]
  const [open, setOpen] = useState(false)
  const handleOnClick = (val) => {
    setOpen(val)
  }

  return (
    <>
      <div className='container' style={{ float: 'right' }}>
        <div className='avaterImage'>
          <Image width='30%' style={{ borderRadius: '0px 10px 0px 10px' }} src={path} />
        </div>
        <Divider orientation='left' style={{ padding: '0 30px' }} plain>
          <p style={{ fontSize: '20px', fontFamily: 'HardFont' }}>介绍</p>
        </Divider>
        <div className='myName' style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontFamily: 'Arial' }}>0xYeNH</span>
        </div>
        <p style={{ fontFamily: 'HardFont', backgroundColor: '#172554', color: 'white', opacity: '0.8', borderRadius: '10px', fontSize: '18px', margin: '10px auto', width: '300px', padding: '20px' }}>
          大学时期开始接触区块链，做过自己的创业项目，擅长编写智能合约，有制作NFT项目经验，熟悉主流Defi协议，黑客松选手
        </p>
        <Divider orientation='left' style={{ padding: '0 30px' }} plain>
          <p style={{ fontSize: '20px', fontFamily: 'HardFont' }}>掌握技能</p>
        </Divider>
        <div style={{ padding: '0 10%' }}>
          {list.map((item) => (
            <Image key={item} src={item} />
          ))}
        </div>
        <Divider orientation='left' style={{ padding: '0 30px' }} plain>
          <p style={{ fontSize: '20px', fontFamily: 'HardFont' }}>联系方式</p>
        </Divider>
        <div className='contactInfomation'>
          <Space>
            <Tag icon={<TwitterOutlined />} color='#55acee'>
              <a target='_blank' href='https://twitter.com/0xYeNH'>
                Twitter
              </a>
            </Tag>
            <Tag icon={<GithubOutlined />} color='#09090b'>
              <a target='_blank' href='https://github.com/lesser-P'>
                GitHub
              </a>
            </Tag>
            <Tag icon={<WechatOutlined />} color='#16a34a'>
              <a onClick={() => handleOnClick(true)}>WeChat</a>
            </Tag>
          </Space>
        </div>
      </div>

      <Modal title='WeChat' centered open={open} onCancel={() => handleOnClick(false)} onOk={() => handleOnClick(false)}>
        <Image src='../public/WechatIMG77.jpg'></Image>
      </Modal>
    </>
  )
}
export default SideBar
