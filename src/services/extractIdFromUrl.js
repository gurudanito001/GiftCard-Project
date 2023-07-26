
export default function extractIdFromUrl (url, filteredChars){
  let id = url.replace(filteredChars, "");
  return id
}