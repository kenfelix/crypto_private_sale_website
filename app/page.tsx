"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import logo from '../public/logo.png'
import { ConnectWallet } from '@thirdweb-dev/react'
import { useGlobalContext } from './Context/store';
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { crowdsale_details } from './contract';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { DotLoader } from 'react-spinners';
import { usePathname, useSearchParams } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {amount, setAmount, loading, setLoading} = useGlobalContext()
  const pathname = usePathname()
  const params = useSearchParams()

  const address = useAddress();
  const signer = useSigner();
  const contract = new ethers.Contract(crowdsale_details['contract address'], crowdsale_details.abi, signer)
  const toWei = (ether: string) => ethers.utils.parseEther(ether)

  const buyTokens = async () => {
      const wei = toWei(amount)
      await contract.buyTokens(address, {value: wei})
  }
  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [pathname, params, setLoading])

  const handleSubmit = () => {buyTokens()}
  return (
    <>
      {
        loading ? 
          <div className='w-full h-screen flex items-center justify-center'>
            <DotLoader
              color="#a2cf2f"
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        :
        <div className='w-full h-full flex flex-col p-[20px] items-center gap-[40px]'>
          {/* header */}
          <div className='flex flex-row md:px-[60px] justify-between space-x-[50px] items-center sm:space-x-[100px] lg:space-x-[350px] xl:space-x-[600px]'>
            {/* left-side */}
            <div className='flex flex-row flex-wrap gap-3'>
              <a className='flex flex-row' href='#'>
              <Image src={logo} alt={''} className='h-[50px] w-[50px]'/>
              </a>
              <div className='hidden sm:flex flex-row gap-2 mt-[14px] text-[14px]'>
                <a href="#">
                <h5 className='text-white cursor-pointer hover:text-[#a2cf2f] ml-[20px]'>Home</h5>
                </a>
                <a href="#">
                <h5 className='text-white cursor-pointer hover:text-[#a2cf2f]'>Whitepaper</h5>
                </a>
              </div>
            </div>
            {/* right-side */}
            <ConnectWallet/>
          </div>
          <div className='bg-[#262626] p-[25px] text-white rounded-[10px] space-y-[10px] max-w-[400px]'>
            <div className='flex flex-col flex-wrap items-center mb-[20px]'>
              <h4 className='text-[24px] font-medium leading-4'>CRYPTO</h4>
              <h3 className='text-[45px] font-light'>Private Sale</h3>
            </div>
            <hr className='border-[#b9b9b9]'/>
            <p className='text-[12px] text-[#a2cf2f]'>NOTICE:</p>
            <p className='text-[#b9b9b9]'>Congrats! You&apos;re selected for Krypto&apos;s private sale. Don&apos;t miss out, act now and enjoy exclusive offers!</p>
            <hr className='border-[#b9b9b9]'/>
            <p className='text-[12px] text-[#a2cf2f]'>HOW TO PARTICIPATE:</p>
            <ul className='text-[#b9b9b9] list-disc'>
              <li>Connect Your wallet and make sure its on Smart chain</li>
              <li>Enter the amount and click on purchase token</li>
              <li>Import token into your wallet if its not already imported to see purchased token</li>
            </ul>
            <hr className='border-[#b9b9b9]'/>
            <div className='flex flex-col gap-7'>
            <div className='bg-[#686868] rounded-md p-2 flex items-center'>
            <p className='text-white'>Private sale price: 0.00000125</p>
            </div>
            <div  className='flex flex-col items-center justify-between space-y-3'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <input
                  type="number"
                  placeholder='0.00 BNB'
                  required
                  onChange={e => setAmount(e.target.value)}
                  className='bg-transparent rounded-lg focus:outline-none border-[1px] p-2 border-solid border-[#6c8726]'
                />
                <input
                  type="submit"
                  value="Purchase Token"
                  className='cursor-pointer bg-[#6c8726] hover:bg-[#89ad2e] p-2 rounded-md'
                />
              </form>
            </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}