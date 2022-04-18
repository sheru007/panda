import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Blog = () => {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState({})
  const [title, setTitle ] = useState('dummy title')
    useEffect(() => {
        console.log("client side call ::: useEffect is running in blog component ...... ")
        fetch('https://www.damensch.io/api/user').then(res => res.json()).then(data => {
            console.log({data})
            setData(data)
        }).catch(error => {
            console.log({error})
        })
    }, [])

    const hanldeOnClick = () => {
        fetch('https://www.damensch.io/api/update-title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk007`,
            },
            body: JSON.stringify({
                title
            })
        })  
        .then(res => res.json()).then(data => {
            console.log({data})
            if(data?.title) {
                setTitle(data?.title)
            }
            setData(data)
        })
        .catch(error => {
            console.log({error})
        })
    }
  return(<div>
      <h1>Title :: {data?.title || 'dummy'}</h1>
      
      <p>Blog: {pid}</p>
      {
          data?.name && <p>name : {data?.name || 'default-name'}</p>
      }
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={hanldeOnClick}>update title</button>
      </div>
      )
}
// export async function getServerSideProps(context) {
//     let data = await fetch('https://d36po8tdh5ajx3.cloudfront.net/api');
//     let res = await data.json()
//     console.log({ssr_Res : res})
//     return {
//         props: {data: res}
//     }
// }
export default Blog