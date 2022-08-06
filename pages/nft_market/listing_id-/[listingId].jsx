import {
  MediaRenderer,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useAddress,
  useMakeBid,
  useBuyNow,
} from "@thirdweb-dev/react";
import { ChainId, ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useState } from "react";
import swal from 'sweetalert2';
import { MARKETPLACE_ADDRESS } from "../../../const/contract";
import theme from '../../../assets/css/Base.module.scss';

export default function ListingPage() {
  const router = useRouter();
  const { listingId } = router.query;

  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const marketplace = useMarketplace(MARKETPLACE_ADDRESS);
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );

  if (listing?.secondsUntilEnd === 0) {
  }

  const [bidAmount, setBidAmount] = useState("");

  if (loadingListing) {
    return <div className={theme.loading}>
            <div className={theme.loader}></div>
          </div>;
  }

  if (!listing) {
    return <div className={theme.loading}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Mumbai].wrapped.address, // Wrapped Ether address on Rinkeby
          bidAmount // The offer amount the user entered
        );
      }

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      swall.fire( "success"
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`, "success"
      );
    } catch (error) {
      console.log(error.message || "something went wrong");
      swal.fire("Oops..", "something went wrong", "error");
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      swal.fire("Berhasil!", "Pembelian NFT sukses", "success");
    } catch (error) {
      console.log(error);
      swal.fire("Gagal...!", "Pembelian NFT gagal", "error");
    }
  }

  return (
    <div className={theme.layout}>
      <div className={theme.container_layout}>
<div className={theme.listing_content}>
        <div className={theme.leftListing}>
          <MediaRenderer
            src={listing.asset.image}
            className={theme.mainNftImage}
            width={500}
            height={500}
          />
        </div>

        <div className={theme.rightListing}>
<div className={theme.descHeader}>
          <h1>{listing.asset.name}</h1>
          <p className={theme.user}>
            Owned by <b>{listing.sellerAddress?.slice(0, 6)}</b>
          </p>
</div>
<div className={theme.descBody}>
          <h2 className={theme.nftPrice}><i className={theme.poly_logo} />
            <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {listing.buyoutCurrencyValuePerToken.symbol}
          </h2>
<span classsName={theme.Description}><p>Description :</p>{listing.asset.description}</span>
</div>
<div className={theme.descButtonbuy}>
          <div
          >
            <button
              style={{ borderStyle: "none", width: "100%" }}
              className={theme.button_md}
              onClick={buyNft}
            >
              Buy
            </button>

            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                name="bidAmount"
                className={theme.textInput}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
                style={{ marginTop: 0, marginLeft: 0, width: 128 }}
              />
              <button
                className={theme.mainButton}
                onClick={createBidOrOffer}
                style={{
                  borderStyle: "none",
                  background: "transparent",
                  width: "fit-content",
                }}
              >
                Make Offer
              </button> 
            </div> */}
</div>
          </div>
        </div>
</div>
      </div>
    </div>
  );
}
