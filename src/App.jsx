import { useEffect, useState } from 'react'

import axios from 'axios'

import CsvDownloadButton from 'react-json-to-csv'

import db from './dbipmaxmind.json'

export default function App() {

  const [result, setResult] = useState(null)

  const API_BASE_URL = 'https://api.iplocation.net'

  const configBasic = {
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  const rget = async (ip) => {
    const config = { ...configBasic, headers: { ...configBasic.headers } }
    return await axios.create(config).get(ip)
  }

  const getISP = async (ip) => {
    const data = await rget(`/?ip=${ip}`)
    return data
  }

  const searchIPS = async () => {
    let array = []
      for (let i = 0; i < db.length; i++) {
        const { ip } = db[i]
        let data = getISP(ip)
        console.log(data)
        array.push({ ...db[i], isp })
      }
    setResult(array)
  }

  useEffect(() => {
    console.log(result)
  }, [result])

  useEffect(() => {
    searchIPS()
  }, [])

  return (
    <div className="bg-slate-900 p-10 gap-4 text-white w-full min-h-screen flex flex-col">
      <h1 className='w-full text-center text-3xl'>IP to ISP</h1>

      {
        result ? (
          <CsvDownloadButton data={result} />
        ) : (
          <div className='w-full h-36 grid place-items-center'>
            {/* SVG LOADING */}
            <svg
              className="animate-spin -ml-1 mr-3 h-36 w-36 text-sky-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )
      }
      
      {/* <div className='relative w-full'>

        <input
          id='ip'
          onChange={onChange}
          placeholder=' ' // This is required for the label animation to work
          className={`block h-12 py-[13px] md:py-0 px-[8px] w-full text-sm bg-transparent ring-0 outline-none rounded-md border border-neutral-3 appearance-none duration-200 focus:outline-none focus:ring-0 focus:duration-200 focus:border-sky-500 peer `}
        />
        <label
          htmlFor='ip'
          className={`absolute cursor-text text-sm text-neutral-3 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-900 px-2 peer-focus:px-2 peer-focus:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 `}
        >
          IP
        </label>

      </div> */}
      {
        result && (
          
          <div className="relative w-full rounded-md overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left ">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-800 ">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                            IP
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                            CITY
                          </th>
                          <th scope="col" className="px-6 py-3">
                            ORG
                          </th> */}
                          <th scope="col" className="px-6 py-3">
                            ISP
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      result.map((item, index) => (
                        <tr className="bg-slate-800 hover:bg-slate-700 ">
                          {/* <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                            {`${item.ip_start} - ${item.ip_end}`}
                          </th>
                          <td className="px-6 py-2">
                            {item.city}
                          </td>
                          <td className="px-6 py-2">
                            {item.org}
                          </td> */}
                          <td className="px-6 py-2">
                            {item.ip}
                          </td>
                          <td className="px-6 py-2">
                            {item.isp}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot className="text-xs text-slate-400 uppercase bg-slate-800">
                      <tr>
                      <th scope="col" className="px-6 py-3">
                            IP
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                            CITY
                          </th>
                          <th scope="col" className="px-6 py-3">
                            ORG
                          </th> */}
                          <th scope="col" className="px-6 py-3">
                            ISP
                          </th>
                      </tr>
                  </tfoot>
              </table>
          </div>

        )
      }
    </div>
  )
}
