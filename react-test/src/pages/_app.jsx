import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import "../styles.css";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> component
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  //_app.jsx
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal 
        projectId={projectId} 
        ethereumClient={ethereumClient} 
        themeMode="light" // dark
        defaultChain={polygon}  // 기본 체인
        termsOfServiceUrl="#" // 서비스 약관
        privacyPolicyUrl="#"  // 개인정보
        // tokenOptions={{
        //   desktopWallet: [
        //     {
        //       address: "0x613167fbA619ff20f4a3BdDEeAb8d37aB58490aE",
        //       symbol: "KSTA",
        //       decimals: 18,
        //       image: "https://example.com/ksta-logo.png", // KSTA 로고 이미지 URL
        //     },
        //   ],
        // }}
      />
    </>
  );
}
