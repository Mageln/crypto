
import { cryptoAssets,} from "../data"
import axios from "axios"


const API_URL = "https://openapiv1.coinstats.app"


export const fetchCrypto = () => {

    return axios.get(`${API_URL}/coins`,{
        headers:{
            "X-API-KEY": "K0f9fnhuSJ4sqx7luskmQumqSJ4ple9LJ8xGZWAXYXM="
        }
        
    } )

    .then(response => response.data)
    .catch(error => console.error(error))
    
}
// export const fetchCrypto = () => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(cryptoData)
//         },1)
//     })
// }
export const fetchAssets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        },1)
    })
}

export const fetchCharts = () => {
    return axios.get(`${API_URL}/${coinId}`)
}