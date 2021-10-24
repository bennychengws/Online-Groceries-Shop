// import useSWR from "swr";

export async function clientAuthenticationCheck() {
  const res = await fetch("http://localhost:3000/api/jwtClientCheck")
  const resMessage = await res.json()
  console.log("authenticationCheck value: " + resMessage.isAuthenticated)
  return resMessage.isAuthenticated;
}


