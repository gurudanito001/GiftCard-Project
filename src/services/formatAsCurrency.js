export default function formatAsCurrency(x) {
  if (!x) x = '';
  x = x.toString().replace(/,/g, '');
  let result = `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  if(!result.includes(".")){
    result += ".00"
  }
  if(result.split(".")[1].length === 1){
    result += "0"
  }
  return result
}