export const convertRawtoString = (labelValue,isSub =false) => {

    const num = Math.abs(Number(labelValue));

    if(num >=1.0e9){
        return (num/1.0e9).toFixed(0)+"B"
    } 
    if(num >=1.0e6){
        return (num/1.0e6).toFixed(0)+"M" //1500000 -> 1M
    }
    if(num >=1.0e3){
        return (num/1.0e3).toFixed(isSub ? 2:0)+"M" //1500 -> 1k
    }
    return num.toString();
}
