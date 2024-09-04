export  function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function capitaliza(str){
    return str.charAt(0).toUpperCase() + str.substr(1)
}

// export const sumPortfolio = (assets) =>{
//     return {assets.map(asset => {
//             const coin = crypto.find(c => c.id === asset.id)
//             return asset.amount * coin.price
//         }).reduce((acc, v) => acc += v, 0).toFixed(2)}
    
// }