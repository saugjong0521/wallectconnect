import { Web3Button, Web3NetworkSwitch, W3mQrCode } from "@web3modal/react";
import CustomButton from "../components/CustomButton";

export default function Home( ) {

  //index.jsx
  return (
    <>
      {/* 지갑 연결, balance표시 버튼  */}
      <Web3Button 
        icon="show" //hide
        label="Connect Wallet" // 문구
        balance="show" //hide
      />
      <br />

      {/* 네트워크 전환 버튼, 작동 후 지갑 연결 버튼으로 이어짐 */}
      <Web3NetworkSwitch />
      <br />

      {/* 스타일 커스텀이 가능한 버튼 */}
      <CustomButton />
      <br />
      
      {/* 혹은 QR만으로 적용할 경우 다음과 같이 가능합니다. */}
      <W3mQrCode 
        size={200} 
        imageUrl="url/to/image" 
        uri="data" 
      />
    </>
  );
}
