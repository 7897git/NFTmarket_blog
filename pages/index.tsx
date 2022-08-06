import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useTokenDrop,
} from "@thirdweb-dev/react";
import React, { useRef, useState } from 'react'
import type { NextPage } from "next";
import Link from "next/link";
import Modal from 'react-modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TokenHolders from "../components/TokenHolders";
import Claim from "../components/Claim";
import Transfer from "../components/Transfer";
import truncateAddress from "../lib/truncateAddress";
import { AIRDROP_TOKEN } from "../const/contract";
import theme from '../assets/css/Base.module.scss';

Modal.setAppElement('#__next');

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();

  const tokenDropContract = useTokenDrop(
    AIRDROP_TOKEN
  );


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

  return (
    <div className={theme.layout}>
      <div className={theme.container_layout}>
      {address ? (
        <>
<div className={theme.flexCenter}>
          <a onClick={disconnectWallet} className={theme.button_md}>
            Disconnect Wallet
          </a>
          <p style={{padding: '5px 15px', background: '#fff', width: 'fit-content', display: 'block'}}>Your address: {truncateAddress(address)}</p>
</div>
          <hr className={theme.divider} />
<div className={theme.claim_layout}>
<div className={theme.airdropBox}>
          <h2 className={theme.texth2}>Claim <b>UC</b> Token AirDrop</h2>
<small style={{color: '#fff', textAlign: 'start'}}>Contract Number</small>
<small style={{marginTop: '0px', color: '#fff', textAlign: 'start'}}>0xcFf85eB0bdCE164274BF52eAf6A90da2251419c8</small>
            <h1 style={{color: 'rgb(255 235 59)', textShadow: '2px 2px 4px #00000070'}}>10000.0 <span className={theme.symbol}>$</span> UC</h1>
          <Claim tokenDropContract={tokenDropContract} />
</div>
<div className={theme.transferBox}>
          <h2 className={theme.texth2}>Transfer UC Token</h2>
          <Transfer tokenDropContract={tokenDropContract} />
</div>
</div>
        </>
      ) : (
<div>
        <button className={theme.button_md}  onClick={openModal}>
          Connect Wallet
        </button>
</div>
      )}

      <hr className={theme.divider} />
<div className={theme.horderBox}>
      <TokenHolders />
</div>
      </div>
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
<button className={theme.buttonConnect} style={{background: "rgb(219 102 4)", color: "#fff"}}
          onClick={ () => { connectWithMetamask(); closeModal();}}><i className={theme.metamask}></i> METAMASK WALLET</button>
        <button className={theme.buttonConnect}
          onClick={ () => { connectWithWalletConnect(); closeModal();}}><i className={theme.walletconnect}></i> WALLETconnect</button>
      </Modal>
    </div>
  );
};

export default Home;
