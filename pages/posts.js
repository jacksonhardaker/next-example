import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'
import GlobalStyles from '../components/styles'

const Posts = ({ posts }) => (
  <div>
    <Head>
      <title>Posts</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Posts</h1>

      <div className='row'>
        {posts.map(post => (
          <Link href={`/post/${post.id}`}>
            <a className='card'>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>

    <GlobalStyles />
  </div>
)

Posts.getInitialProps = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then(({ data }) => {
      return {
        posts: data
      }
    })
}

export default Posts
