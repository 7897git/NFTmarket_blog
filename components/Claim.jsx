import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import swal from 'sweetalert2';
import theme from '../assets/css/Base.module.scss';

export default function Claim({ tokenDropContract }) {
  const address = useAddress();
  const amountToClaim = 10000.00;

  async function claim() {
    if (!amountToClaim || !address) {
      return;
    }

    try {
      const claimResult = await tokenDropContract?.claim(amountToClaim);
      console.log("Claimed", claimResult);
      swal.fire("Berhasil..!", "You have Claimed 10000 UC", "success");
    } catch (error) {
      console.log(error);
      swal.fire("Gagal..!", "Your Claim failed...<br/>Hanya untuk satu kali claim.", "error");
    }
  }

  return (
    <div className={theme.claimGrid}>

      <button onClick={claim} className={theme.button_md} style={{width: '-webkit-fill-available'}}>
        Claim
      </button>
    </div>
  );
}
