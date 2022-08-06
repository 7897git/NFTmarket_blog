import { useAddress, useMetamask, useWalletConnect, useDisconnect } from "@thirdweb-dev/react";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import theme from './Nav.module.scss';
import themes from '../../assets/css/Base.module.scss';
import meta from '../../content/meta'

Modal.setAppElement('#__next');

const pages = meta.pages || []

const Navigation = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#9E9E9E';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter()
  const activeRoute = `/${router.pathname.split('/')[1]}`

  return <div className={theme.wrapper}>
    <nav className={theme.container}>
      <input type="checkbox" aria-label="Toggle menu" />
      <span></span>
      <span></span>
      <span></span>

      <Link href="/">
        <a className={theme.logo}>
          <Image
            src="/icons/512.png"
            alt="My Awesome Website"
            layout="fill"
            priority
          />
        </a>
      </Link>
      <div className={theme.navigation}>
        <ul>
          {pages.map(page =>
            <li key={page.link}>
              <Link href={page.link}>
                <a className={activeRoute === page.link ? theme.active : ''}>
                  {page.name}
                </a>
              </Link>
            </li>
          )}
        </ul>
        <ul className={theme.socialIcons}>
        <li>
            <>
      {address ? (
<>
        <a className={themes.disconnect} onClick={disconnectWallet}>{address.slice(0, 2).concat("-").concat(address.slice(-4))} <LogoutIcon /></a>
</>
      ) : (
        <a className={themes.connect} onClick={openModal}><AccountBalanceWalletIcon /></a>
      )}
</>
        </li>
          { meta.twitter && <li>
            <a href={`https://twitter.com/${meta.twitter}`} title="Twitter">
            <TwitterIcon/>
            </a>
          </li> }
          { meta.github && <li>
            <a href={meta.github} title="GitHub">
            <GitHubIcon />
            </a>
          </li> }
          { meta.facebook && <li>
            <a href={meta.facebook} title="Facebook">
            <FacebookIcon />
            </a>
          </li> }
          <li>
            <a href="/rss.xml" title="RSS">
            <RssFeedIcon />
            </a>
          </li>
        </ul>
      </div>
    </nav>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={theme.customModal}
        overlayClassName={theme.modalOverlay}
        contentLabel="Modal"
      >
        <h6 className={theme.h6modal} ref={(_subtitle) => (subtitle = _subtitle)}>Connect your wallet</h6>
        <button className={theme.closeBtn} onClick={closeModal}></button>
<button className={themes.buttonConnect} style={{background: "rgb(219 102 4)", color: "#fff"}}
          onClick={ () => { connectWithMetamask(); closeModal();}}><i className={themes.metamask}></i> METAMASK WALLET</button>
        <button className={themes.buttonConnect}
          onClick={ () => { connectWithWalletConnect(); closeModal();}}><i className={themes.walletconnect}></i> WALLETconnect</button>
      </Modal>
  </div>
}

export default Navigation
