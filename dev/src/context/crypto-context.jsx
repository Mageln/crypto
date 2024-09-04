import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "../api/api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

// eslint-disable-next-line react/prop-types
export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

const mapAssets = (assets, result) => {
    return assets.map(asset => {

        const coin = result.find(c => c.id === asset.id)
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
        }
    })
}

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets,result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

const addAsset = (newAsset) => {

    return(
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    )
}

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext


// eslint-disable-next-line react-refresh/only-export-components
export const useCrypto = () => {
    return useContext(CryptoContext)
}