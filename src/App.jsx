import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header_c from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import Note from './pages/Note'
import SideBar from './components/SideBar'
import Write from './pages/Write'
import { Col, Layout, Row, Space } from 'antd'
import SnakeGame from './components/SnakeGame'
const { Header, Footer, Sider, Content } = Layout
import MarkDown from './pages/MarkDown'
import { erc20ABI } from 'wagmi'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia, avalancheFuji } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit'
import SendTransaction from './pages/SendTransaction'

// 配置想要wagmi使用的链以及想要使用的提供程序
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({
      apiKey: '0NbaItAevGbfToVMWYFte-oGyJUJuulW',
    }),
  ]
)
const { connectors } = getDefaultWallets({
  appName: 'blog',
  projectId: '1',
  chains,
})
//创建一个wagmiconfig实例
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})
function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          coolMode
          modalSize='compact'
          showRecentTransactions={true}
          chains={chains}
          initialChain={sepolia}
        >
          {/* <SendTransaction></SendTransaction> */}
          <BrowserRouter>
            <Header_c></Header_c>
            <div className='context'>
              <Routes>
                <Route path='/markdown' element={<MarkDown />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/project' element={<Project />}></Route>
                <Route path='/note' element={<Note />}></Route>
                <Route path='/write' element={<Write />}></Route>
                <Route path='*' element={<Home />}></Route>
              </Routes>
              <SideBar></SideBar>
            </div>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
