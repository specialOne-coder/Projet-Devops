import { createContext, useEffect, useState } from "react";
import {
  DappProviderProps,
  DappContextType,
} from "./dapp.type";
import { magic } from "../App";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";


export const EuroTzContext = createContext<DappContextType | null>(null);


const EuroTzProvider = ({ children }: DappProviderProps) => {
  const [magicPkh, setMagicPkh] = useState<string>("");
  const [beaconPkh, setBeaconPkh] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const Tezos = new TezosToolkit(import.meta.env.VITE_RPC_URL as string);
  const wallet = new BeaconWallet({ name: "Euro tz" });

  const connect = async (type: string, email: string) => {
    switch (type) {
      case "email":
        await magic.auth.loginWithEmailOTP({ email });
        setIsLoggedIn(true);
        break;
      case "wallet":
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
          console.log("Pk =>", activeAccount);
          console.log("Already connected:", activeAccount.address);
          setBeaconPkh(activeAccount.address);
          return activeAccount;
        } else {
          Tezos.setWalletProvider(wallet);
          try {
            console.log("Requesting permissions...");
            const permissions = await wallet.client.requestPermissions();
            console.log("Got permissions:", permissions.address);
            setBeaconPkh(permissions.address);
          } catch (error) {
            console.log("Got error:", error);
          }
        }
        break;
      default:
        break;
    }
  };

  const disconnect = async (type: string, email: string) => {
    switch (type) {
      case "email":
        await magic.auth.loginWithEmailOTP({ email });
        setMagicPkh("");
        setIsLoggedIn(false);
        break;
      case "wallet":
        let disco = await wallet.disconnect();
        console.log("disco =>", disco);
        setBeaconPkh("");
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    const checkMagicLogin = async () => {
      const isMagicLoggedIn = await magic.user.isLoggedIn();
      setIsLoggedIn(isMagicLoggedIn);
      if (isMagicLoggedIn) {
        console.log("magic.taquito", magic);
        const publicAddress = (await magic.taquito.getPublicKey()).pkh;
        console.log("publicAddress", publicAddress);
        setMagicPkh(publicAddress);
        setUserMetadata(await magic.user.getInfo());
        console.log("userMetadata", userMetadata);
        console.log("publicAddress", publicAddress);
      }
    };
    checkMagicLogin();
  }, [isLoggedIn]);

  useEffect(() => {
    async function check() {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        console.log("Already connected:", activeAccount.address);
        setBeaconPkh(activeAccount.address);
      }
    }
    check();
  }, []);

  return (
    <EuroTzContext.Provider
      value={{
        connect,
        disconnect,
        magicPkh,
        beaconPkh,
      }}
    >
      {children}
    </EuroTzContext.Provider>
  );
};

export default EuroTzProvider;
