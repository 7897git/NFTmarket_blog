import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import swal from 'sweetalert2';
import theme from '../assets/css/Base.module.scss';

export default function Transfer({ tokenDropContract }) {
  const address = useAddress();
  const [addressToTransferTo, setAddressToTransferTo] = useState("");
  const [amountToTransfer, setAmountToTransfer] = useState("");

  async function transfer() {
    if (!addressToTransferTo || !amountToTransfer || !address) {
      return;
    }

    try {
      const transferResult = await tokenDropContract?.transfer(
        addressToTransferTo,
        amountToTransfer
      );

      const newBalance = await tokenDropContract?.balanceOf(address);

      swal.fire('Berhasil', `Successfully transferred. New balance:
        ${newBalance.displayValue} ${newBalance.symbol}
      `, 'success');
    } catch (error) {
      console.log(error);
      swal.fire("Gagal", "Proses transfer gagal, coba lagi nanti.", "error");
    }
  }

  return (
    <div className={theme.tranferInput}>
      <input
        type="text"
        placeholder="Address to transfer to"
        onChange={(e) => setAddressToTransferTo(e.target.value)}
        className={`${theme.textInput} ${theme.noGapBottom}`}
      />
      <input
        type="text"
        placeholder="Amount to transfer"
        onChange={(e) => setAmountToTransfer(e.target.value)}
        className={`${theme.textInput} ${theme.noGapBottom}`}
      />
      <button onClick={transfer} className={theme.button_md}>
        Transfer
      </button>
    </div>
  );
}
