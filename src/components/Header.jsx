import { Col, Menu, Row, Button, Popover } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BankOutlined, RocketOutlined, EditOutlined, BookOutlined } from '@ant-design/icons'
import '../css/Header.css'
import MenuItem from 'antd/es/menu/MenuItem'
import WagimDemo from '../pages/WagimDemo'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem('主页', '/home', <BankOutlined style={{ fontSize: '15px' }} />),
  getItem('个人作品', '/project', <RocketOutlined style={{ fontSize: '15px' }} />),
  getItem('笔记', '/note', <EditOutlined style={{ fontSize: '15px' }} />),
  getItem('随笔', '/write', <BookOutlined style={{ fontSize: '15px' }} />),
]
function Header() {
  const addRecentTransaction = useAddRecentTransaction()
  const navigate = useNavigate()
  const [state, setState] = useState(true)
  const handleOnClick = () => {
    setState(!state)
  }
  const routerOnClick = (e) => {
    addRecentTransaction({
      hash: '0xfff8fffbbf1059ab149c85edc125e42836121fdc9488b30d2fc2b2948de8d772',
      description: '...',
    })
    navigate(e.key)
  }

  return (
    <>
      <div className=''>
        <Row>
          <Col span={5}></Col>
          <Col span={8}>
            <Menu
              style={{ fontSize: '15px' }}
              mode='horizontal'
              items={items}
              onClick={routerOnClick}
            ></Menu>
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <div style={{ marginTop: '10px' }}>
              <WagimDemo />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Header
