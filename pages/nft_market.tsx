import React, { useState } from "react";
import {
  useMarketplace,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { MARKETPLACE_ADDRESS } from "../const/contract";
import theme from '../assets/css/Base.module.scss';

export default function Listings() {
  const marketplace = useMarketplace(MARKETPLACE_ADDRESS);
  const { data: listings, isLoading } = useActiveListings(marketplace);

  console.log(listings);

  // Load contract metadata
  const { data: contractMetadata, isLoading: loadingMetadata } =
    useContractMetadata(MARKETPLACE_ADDRESS);

  const [filter, setFilter] = useState(0); // 0 = direct, auction = 1

  return (
    <div className={theme.layout}>
      <div className={theme.container_layout}>
<div className={theme.listing_layout}>
        <div className={theme.title_PageContainer}>
          {!loadingMetadata ? (
            <>
              <h1 className={theme.title_page}>{contractMetadata?.name}</h1>
              <p className={theme.subtitle_page}>{contractMetadata?.description}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        {/* Toggle between direct listing and auction listing */}
        <div className={theme.listingTypeContainer}>
          <input
            type="radio"
            name="listingType"
            id="directListing"
            value="directListing"
            defaultChecked
            className={theme.listingType}
            onClick={() => setFilter(0)}
          />
          <label htmlFor="directListing" className={theme.listingTypeLabel}>
            Direct Listing
          </label>
          <input
            type="radio"
            name="listingType"
            id="auctionListing"
            value="auctionListing"
            className={theme.listingType}
            onClick={() => setFilter(1)}
          />
          <label htmlFor="auctionListing" className={theme.listingTypeLabel}>
            Auction Listing
          </label>
        </div>
        </div>
          

<hr className={theme.smallDivider} />


        {!isLoading ? (
        <div className={theme.nftBoxGrid}>
          <div className={theme.listing_content}>
            {listings
              ?.filter((listing) => listing.type === filter)
              ?.map((listing) => (
                <Link
                  key={listing.id.toString()}
                  href={`/nft_market/listing_id-/${listing.id}`}>
                <a
                  className={theme.nftBox}
                >
                  <ThirdwebNftMedia
                    metadata={{ ...listing.asset }}
                    className={theme.nftMedia}
                  />
                <div className={theme.body_listing}>
                  <h4 className={theme.title_page}
                    style={{margin: '0 0 20px'}}>{listing.asset.name}</h4>
                    <div className={theme.bottomNav}>
                <div className={theme.iconButton}>
                    <a className={theme.icon}>
                    <FavoriteIcon />
                    </a>
                    <a className={theme.icon}>
                    <ShareIcon />
                    </a>
                </div>
                  <p className={theme.price_list}><i className={theme.poly_logo}></i>
                    {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                    {listing.buyoutCurrencyValuePerToken.symbol}
                  </p>
                    </div>
                </div>
                </a>
                </Link>
              ))}
          </div>
        </div>
        ) : (
          <div className={theme.loading}>
            <div className={theme.loader}></div>
          </div>
        )}
</div>
      </div>
    </div>
  );
}
