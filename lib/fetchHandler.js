import axios from "axios"

const fetchHandler = async(url, method=undefined, context=undefined, content=undefined) => {
  if (method === "GET") {
    var apiData = await axios.get(url, {
      headers: {cookie: context.req?.headers.cookie}
    })
    console.log(`${method} status of ${url}: ${apiData.status}`)
    
    return apiData
  } else if (method === "PUT" || method === "POST" || method === "DELETE") {
    var apiData = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),      
    })
    console.log(`${method} status of ${url}: ${apiData.status}`)
    return apiData
  } else {
    return {message: "Invalid method inputted into fetchHandler"}
  } 
}

export default fetchHandler
