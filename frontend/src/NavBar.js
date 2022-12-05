import React from "react";

function NavBar({ accounts, setAccounts }) {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }
  return (
    <div class="bg-white border-gray-200 px-2 py-2.5 rounded">
      <div class=" flex flex-wrap  justify-between mx-auto">
        {/* Left Side of nav */}
        <div>Lottery developed by </div>

        {/* Connect button */}
        {isConnected ? (
          <h3>You're connected with account: {accounts[0]}</h3>
        ) : (
          <button
            onClick={connectAccount}
            type="button"
            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
