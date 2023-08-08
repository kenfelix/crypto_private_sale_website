"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { ThirdwebProvider} from "@thirdweb-dev/react"
import { Binance } from "@thirdweb-dev/chains";

interface ContextProps {
    amount: string,
    setAmount: Dispatch<SetStateAction<string>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

interface GlobalContextProviderProps {
    children: React.ReactNode
  }

const GlobalContext = createContext<ContextProps>({
    amount: "",
    setAmount: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    },
    loading: true,
    setLoading: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    }
})

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)

    return (
        <ThirdwebProvider activeChain={Binance} dAppMeta={{
            name: "KiwiNative",
            description: "Kiwinative is a web3 based project that focuses on enhancing peer to peer transactions and improves usability and profitability.",
            logoUrl: "https://kiwinative.pro/logo.png",
            url: "https://kiwinative.pro",
          }}>
        <GlobalContext.Provider value={{amount, setAmount, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
        </ThirdwebProvider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);