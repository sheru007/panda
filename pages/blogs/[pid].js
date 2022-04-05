import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Blog = ({data = {}}) => {
  const router = useRouter()
  const { pid } = router.query
//   const [data, setData] = useState({})
//     useEffect(() => {
//         console.log("client side call ::: useEffect is running in blog component ...... ")
//         fetch('https://d36po8tdh5ajx3.cloudfront.net/api').then(res => res.json()).then(data => {
//             console.log({data})
//             setData(data)
//         }).catch(error => {
//             console.log({error})
//         })
//     }, [])
  return(<div>
      <p>Blog: {pid}</p>
      {
          data?.name && <p>name : {data?.name || 'default-name'}</p>
      }
      </div>
      )
}
export async function getServerSideProps(context) {
    let data = await fetch('https://d36po8tdh5ajx3.cloudfront.net/api');
    let res = await data.json()
    console.log({ssr_Res : res})
    return {
        props: {data: res}
    }
}
export default Blog