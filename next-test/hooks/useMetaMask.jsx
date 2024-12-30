import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const useMetaMask = () => {
  // MetaMask 전용 InjectedConnector 설정
  const metaMaskConnector = new InjectedConnector({
    options: {
      name: "MetaMask",
      shimDisconnect: true, // 연결 해제 시 캐시 초기화
      getProvider: () => {
        if (typeof window !== "undefined" && window.ethereum?.isMetaMask) {
          return window.ethereum; // MetaMask 전용 provider 반환
        }
        console.warn("MetaMask is not installed or not detected.");
        return null;
      },
    },
  });

  const { connect } = useConnect({
    connector: metaMaskConnector,
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  // MetaMask 연결
  const connectMetaMask = async () => {
    try {
      if (!metaMaskConnector?.options?.getProvider()) {
        throw new Error("MetaMask is not installed. Please install MetaMask.");
      }
      await connect();
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error.message);
      alert(error.message); // 사용자 알림 추가
    }
  };

  // MetaMask 연결 해제
  const disconnectMetaMask = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect MetaMask:", error.message);
    }
  };

  return {
    address,
    isConnected,
    connectMetaMask,
    disconnectMetaMask,
  };
};
