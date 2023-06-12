export function setToken(token: string){
  localStorage.setItem('token', token);
}
export function getToken(){
  let token = localStorage.getItem('token')
  if(token !== undefined){
      return token;
  }
  return false;
}
export function deleteToken(){
  localStorage.removeItem('token')
}

export function setFingerprint(fingerprint: string){
  localStorage.setItem('fingerprint', fingerprint);
}
export function getFingerprint(){
  let fingerprint = localStorage.getItem('fingerprint')
  if(fingerprint !== undefined){
      return fingerprint;
  }
  return false;
}
export function deleteFingerprint(){
  localStorage.removeItem('fingerprint')
}
