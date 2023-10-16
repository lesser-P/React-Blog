import { Col, Menu, Row, Button, Popover } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BankOutlined, RocketOutlined, EditOutlined, BookOutlined } from '@ant-design/icons'
import '../css/Header.css'
import MenuItem from 'antd/es/menu/MenuItem'

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
function InfoButton({ handleOnClick }) {
  return (
    <Popover placement='bottom' content='0xF5AcD7df01A57360E8E53AC2d28B8452EC0eFcc6'>
      <Button size='large' onClick={handleOnClick}>
        0xF52*********cc6
      </Button>
    </Popover>
  )
}
function Header() {
  const navigate = useNavigate()
  const [state, setState] = useState(true)
  const handleOnClick = () => {
    setState(!state)
  }
  const routerOnClick = (e) => {
    navigate(e.key)
  }

  return (
    <>
      <div className=''>
        <Row>
          <Col span={4}></Col>
          <Col span={13}>
            <Menu style={{ fontSize: '15px' }} mode='horizontal' items={items} onClick={routerOnClick}></Menu>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <div style={{ marginTop: '10px' }}>
              {state ? (
                <Button onClick={handleOnClick} type='primary' size='large'>
                  Connect Wallet
                </Button>
              ) : (
                <InfoButton handleOnClick={handleOnClick} />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Header
