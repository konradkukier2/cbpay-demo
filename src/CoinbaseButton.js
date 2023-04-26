import { useEffect, useRef, useState } from 'react';
import { initOnRamp } from '@coinbase/cbpay-js';

export const CoinbaseButton = () => {
  const [isReady, setIsReady] = useState(false);
  const onrampInstance = useRef();

  useEffect(() => {
    //initOnRamp parameters
    const options = {
      appId: '7c6aea3e-ab00-4708-9a83-aec3c873f141',
      target: '#cbpay-container',
      widgetParameters: {
        destinationWallets: [
          {
            address: '0xa110CC27a19f6853e9Aa8Bb8e2C603D7b02ea2df',
            supportedNetworks: ['ethereum'],
            assets: ['USDC', 'ETH'],
          },
        ],
      },
      onSuccess: () => {
        // handle navigation when user successfully completes the flow
      },
      onExit: () => {
        // handle navigation from dismiss / exit events due to errors
      },
      onEvent: (event) => {
        // event stream
      },
      experienceLoggedIn: 'popup',
      experienceLoggedOut: 'popup',
    };

    // instance.destroy() should be called before initOnramp if there is already an instance.
    if (onrampInstance.current) {
      onrampInstance.current.destroy();
    }

    initOnRamp(options, (error, instance) => {
      if (instance) {
        onrampInstance.current = instance;
        setIsReady(true);
      }
    });
  }, []);

  const handleOnPress = () => {
    onrampInstance.current.open();
  };

  return (
    <div>
      {!isReady ? (
        <p>loading...</p>
      ) : (
        <a href="#blank" style={{ cursor: 'pointer' }} onClick={handleOnPress} id='cbpay-button-container'>
          BUY
        </a>
      )}
    </div>
  );
};
