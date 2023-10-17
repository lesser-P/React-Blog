import { useConnect, useAccount, useDisconnect, useEnsName, useEnsAvatar } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function WagimDemo() {
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  return (
    <>
      <ConnectButton label='Connect The Wallet' accountStatus='address'></ConnectButton>
      {error && <div>{error.message}</div>}
    </>
  )
}
export default WagimDemo
