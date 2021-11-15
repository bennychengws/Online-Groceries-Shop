import getConfig from 'next/config';

export async function clientAuthenticationCheck() {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/jwtClientCheck`)
  const resMessage = await res.json()
  console.log("authenticationCheck value: " + resMessage.isAuthenticated)
  return resMessage.isAuthenticated;
}


