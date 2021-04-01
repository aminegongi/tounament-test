export const getRoundedRate = (number) => {
  const result = Math.round(number)
  return result > number ? result - 0.5 : result + 0.5
}

export const getFormattedNumber=(number, decimals)=>{

    return number && Number(number.toFixed(decimals))
}
