import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import ajax from '../ajax';

const Blog = ({csrfToken, header}) => {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState({})
  const [title, setTitle ] = useState('dummy title')
  
    useEffect(() => {
        console.log("client side call ::: useEffect is running in blog component ...... ")

        console.log({csrfToken, header})
        //cname + "=" + cvalue + ";" + ";path=/";
        document.cookie = header['set-cookie'][0]

        ajax.get({path: '/api/user'}).then(data => {
            console.log({data})
            setData(data)
        }).catch(error => {
            console.log({error})
        })
    }, [])

    const hanldeOnClick = () => {
        ajax.post({ 
            path: '/api/update-title',
            headers: {
                'Authorization': `Bearer sk007`,
            },
            body: {
                title
            }
        }).then(data => {
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
      <Head>
        <meta name="csrf-token" content={csrfToken}></meta>
      </Head>
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


export async function getServerSideProps(context) {
    const res = await ajax.get({path: '/api/get-csrf-token'})
    
    console.log({ssr_Res : res})
    return {
        props: {csrfToken: res.csrfToken, header: res.header}
    }
}
export default Blog