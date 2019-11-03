import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../../components/nav'
import GlobalStyles from '../../../components/styles'

const AuthorPosts = ({ posts, author }) => (
  <div>
    <Head>
      <title>Posts by {author.name}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Posts by {author.name}</h1>
      <p className='description'>
        <Link href={'/author/[id]'} as={`/author/${author.id}`}>
          <a>&larr; Go Back</a>
        </Link>
      </p>

      <div className='row'>
        {posts.map((post, index) => (
          <Link key={index} href={`/post/${post.id}`}>
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

AuthorPosts.getInitialProps = async ({ query }) => {
  const { id } = query;
  const author = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(({ data }) => data)

  const posts = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(({ data }) => data)

  return {
    author,
    posts
  }
}

export default AuthorPosts
