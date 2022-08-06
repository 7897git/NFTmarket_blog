import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState, useEffect } from "react";
import truncateAddress from "../lib/truncateAddress";
import { AIRDROP_TOKEN } from "../const/contract";
import theme from '../assets/css/Base.module.scss';

export default function TokenHolders() {
  const [loading, setLoading] = useState(true);
  const [holders, setHolders] = useState([]);
  async function checkHolders() {
    const sdk = new ThirdwebSDK("mumbai"); // configure this to your network

    const token = sdk.getToken(AIRDROP_TOKEN);

    const balances = await token.history.getAllHolderBalances();
    setHolders(balances);
    setLoading(false);
  }

  useEffect(() => {
    checkHolders();
  }, []);

  if (loading) {
    return <div className={theme.loading}><div className={theme.loader}></div></div>;
  }

  return (
    <>
      <div className={theme.holderGrid}>
      <h4 style={{textAlign: 'center'}}>Token Holders</h4>
    <div className={theme.spacerBottom}></div>
        {holders
          .sort(
            (a, b) =>
              parseInt(b.balance.displayValue) -
              parseInt(a.balance.displayValue)
          )
          .map((holder) => (
            <div
              key={holder.holder}
              className={`${theme.holderItem} ${theme.spacerBottom}`}
            >
              <p>{truncateAddress(holder.holder)}</p>
              <p>
                {holder.balance.displayValue} <b>{holder.balance.symbol}</b>
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
