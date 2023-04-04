import { useEffect, useState } from 'react'

import axios from 'axios'

import CsvDownloadButton from 'react-json-to-csv'

import db from './dbco.json'

export default function App() {

  const [result, setResult] = useState(null)

  const API_BASE_URL = 'https://ipapi.co'

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
    const { data } = await rget(`/${ip}/json`)
    return data
  }

  function decimalToIp(decimal) {
    var octetos = [];
    for (var i = 0; i < 4; i++) {
      octetos.unshift(decimal % 256);
      decimal = Math.floor(decimal / 256);
    }
    return octetos.join(".");
  }


  const searchIPS = async () => {
    // if(e.target.value === '') return setResult(null)
    // const ip = e.target.value

    let delay = 100
    let cont = 0
    let array = []

    setTimeout(async () => {
      cont % 20 === 0 ? delay = 1000 : delay = 1000
      for (let i = 0; i < db.length; i++) {
        const { ip_start } = db[i]
        let {city} = await getISP(ip_start)
        console.log(cont)
        array.push({ ...db[i], city })
      }
      setResult(array)
    }, delay)

    cont += 1
  }

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
          <p>
            Loading
          </p>
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
        result ? (
          
          <div className="relative w-full rounded-md overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left ">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-800 ">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                            IP
                          </th>
                          <th scope="col" className="px-6 py-3">
                            CITY
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                            ISP
                          </th> */}
                      </tr>
                  </thead>
                  <tbody>
                    {
                      result.map((item, index) => (
                        <tr className="bg-slate-800 hover:bg-slate-700 ">
                          <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                            {`${item.ip_start} - ${item.ip_end}`}
                          </th>
                          <td className="px-6 py-2">
                            {item.city}
                          </td>
                          {/* <td className="px-6 py-2">
                            {item.isp}
                          </td> */}
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot className="text-xs text-slate-400 uppercase bg-slate-800">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                            IP
                          </th>
                          <th scope="col" className="px-6 py-3">
                            CITY
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                            ISP
                          </th> */}
                      </tr>
                  </tfoot>
              </table>
          </div>

        ) : (
          <p>
            Loading
          </p>
        )
      }
    </div>
  )
}
