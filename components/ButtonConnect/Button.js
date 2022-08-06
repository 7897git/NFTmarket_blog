import { useWalletConnect,  useMetamask } from '@thirdweb-dev/react';
import styles from './Button.module.css'

export default function Button() {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  return (
<>
<button className={styles.buttonConnect} style={{background: "rgb(219 102 4)", color: "#fff"}}
          onClick={ () => {connectWithMetamask(); closeModal();}}><i className={styles.metamask}></i> METAMASK WALLET</button>
        <button className={styles.buttonConnect}
          onClick={ () => { connectWithWalletConnect(); closeModal();}}><i className={styles.walletconnect}></i> WALLETconnect</button>
</>
  );
}
