import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink as BetterLink } from "react-router-hash-link";

import { iclose, logo, menu } from "../../assets";
import { navLinks, shortAddress } from "../../utils";
import { Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Login from "../popup/Login";
import { EuroTzContext } from "../../context/DappContext";
import { DappContextType } from "../../context/dapp.type";
import { connectedNavLinks } from "../../utils";
import Profile from "../popup/Profile";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [openedTg, { open, close }] = useDisclosure(false);
  const { magicPkh, beaconPkh } = useContext(
    EuroTzContext
  ) as DappContextType;


  return (
    <nav className="w-full flex py-6 justify-between items-center navbar mt-8">
      <>
        <Modal
          opened={openedTg}
          onClose={close}
          size="md"
          centered
          radius={rem(20)}
        >
          <div className="">
            {
              magicPkh || beaconPkh ? (
                <Profile address={beaconPkh ? beaconPkh : magicPkh} close={close} />
              ) : (
                <Login close={close} />
              )
            }
          </div>
        </Modal>

      </>
      <Link to="/">
        <img src={logo} alt="hoobank" className="w-[124px] " />
      </Link>
      <ul className="list-none sm:flex hidden justify-center items-center flex-1">
        {
          magicPkh || beaconPkh ?
            connectedNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-[white]" : "text-white"
                  } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}
                onClick={() => setActive(nav.title)}
              >
                <BetterLink to={`${nav.id}`}>{nav.title}</BetterLink>
              </li>
            )) :
            navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-[white]" : "text-white"
                  } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}
                onClick={() => setActive(nav.title)}
              >
                <BetterLink to={`${nav.id}`}>{nav.title}</BetterLink>
              </li>
            ))
        }
      </ul>
      <button
        className="py-2 px-6 font-poppins font-medium text-[18px] text-black bg-white rounded-[10px] outline-none"
        onClick={() => {
          open();
        }}
      >
        {" "}
        {magicPkh || beaconPkh
          ? shortAddress([magicPkh, beaconPkh])
          : "Get Started"}
      </button>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? iclose : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${!toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {connectedNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <BetterLink to={`${nav.id}`}>{nav.title}</BetterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
