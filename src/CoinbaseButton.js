import { useEffect, useRef, useState } from 'react';
import { generateOnRampURL } from '@coinbase/cbpay-js';

const options = {
  appId: '7c6aea3e-ab00-4708-9a83-aec3c873f141',
  destinationWallets: [
    {
      address: '0xa110CC27a19f6853e9Aa8Bb8e2C603D7b02ea2df',
      supportedNetworks: ['ethereum'],
      assets: ['USDC', 'ETH'],
    },
  ],
};

export const CoinbaseButton = () => {
  const [url, setUrl] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const onRampURL = generateOnRampURL(options);
    setUrl(onRampURL);
    setIsReady(true);
  }, []);

  const handleOnPress = () => {
    window.open(url, '', 'width=500, height=700, noopener, noreferrer');
  };

  return (
    <div>
      {!isReady ? (
        <p>loading...</p>
      ) : (
        <a style={{ cursor: 'pointer' }} onClick={handleOnPress} id='cbpay-button-container'>
          BUY
        </a>
      )}
    </div>
  );
};
