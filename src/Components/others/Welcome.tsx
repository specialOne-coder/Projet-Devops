import { useContext, useEffect, useState } from "react";
import styles from "../../styles/style";
import { useDisclosure } from "@mantine/hooks";
import { rem, Modal, Loader, Notification } from "@mantine/core";
import Login from "../popup/Login";
import { DappContextType } from "../../context/dapp.type";
import { EuroTzContext } from "../../context/DappContext";
import { IconCheck, IconCurrencyBitcoin, IconX } from "@tabler/icons-react";
import { shortAddress } from "../../utils";

const Welcome = () => {
  const [openedTg, { open, close }] = useDisclosure(false);
  const { magicPkh, beaconPkh } =
    useContext(EuroTzContext) as DappContextType;

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col`}
    >
      <>
        <Modal
          opened={openedTg}
          onClose={close}
          size="md"
          centered
          radius={rem(20)}
        >
          <div className="">
            <Login close={close} />
          </div>
        </Modal>
      </>
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 mt-32`}
      >
        {/* <img src={art} className="w-[50%]" />{" "} */}

        <iframe width="700" height="450" src="https://www.youtube.com/embed/zki5-IHptKA">
        </iframe>
        <p
          className={`${styles.paragraph} justify-center items-center max-w-[470px] mt-8`}
        >
          Build easily your dapp on Tezos.
        </p>

        <button
          className="py-2 px-6 font-poppins font-medium text-[18px] text-black bg-white rounded-[10px] outline-none mt-8"
          onClick={() => {
            open();
          }}
        >
          {" "}
          {magicPkh || beaconPkh
            ? shortAddress([magicPkh, beaconPkh])
            : "Get Started"}
        </button>
      </div>

    </section>
  );
};

export default Welcome;
