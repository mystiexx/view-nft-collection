import React, { useEffect, useState } from "react";
import Card from "./components/Card/Card";


const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [nfts, setNfts] = useState([]);
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.alert("Make sure you have Metamask!");
      } else {
        console.log("We have the ethereum Object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorizeed account", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account find");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getNfts = async () => {
    try {
      const response = await fetch(
        `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${currentAccount}`
      );

      const data = await response.json();
      setNfts(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getNfts();
    console.log(nfts);
  }, [currentAccount]);
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-img" />
        <div>
          {!currentAccount ? (
            <div>
              {" "}
              <p className="sub-text">Connect wallet to view your NFTs</p>
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            </div>
          ) : (
            <div className="sub-text"> Scroll down to view NFTs</div>
          )}
        </div>
      </section>

      <section className="nft-cards">
        {nfts.length <= 0 ? (
          <h5>You dont have any NFTs 👋</h5>
        ) : (
          <div>
            <h5>Your NFTs 👋</h5>
            <div className="nft-card">
              {nfts.map((data, index) => (
                <Card key={index} data={data} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
