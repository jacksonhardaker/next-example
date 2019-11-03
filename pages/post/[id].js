import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Nav from '../../components/nav'
import Link from 'next/link'
import GlobalStyles from '../../components/styles'

const Post = ({ post, comments, author }) => (
  <div>
    <Head>
      <title>{post.title}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>{post.title}</h1>
      <p className='description'>
        <Link href='/'>
          <a>&larr; Go Back</a>
        </Link>
      </p>

      <div className='row'>
        <article>
          <section>{post.body}</section>
          <footer>
            <p>
              <span>Written by&nbsp;</span>
              <Link href={{ pathname: '/author/[id]', query: { prev: post.id }}} as={`/author/${author.id}`}>
                <a>{author.name}</a>
              </Link>
            </p>
          </footer>
        </article>
      </div>

      <div className='description'>
        <h2>Comments</h2>
      </div>
      <div className='row'>
        {comments.map((comment, index) => (
          <div key={index} className='card'>
            <h3>
              <a href={`mailto:${comment.email}`}>
                {comment.name}
              </a>
            </h3>
            <blockquote>{comment.body}</blockquote>
          </div>
        ))}
      </div>
    </div>

    <GlobalStyles />
  </div>
)

Post.getInitialProps = async ({ query }) => {
  const { id } = query
  const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(({ data }) => data)

  const comments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(({ data }) => data)

  const author = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    .then(({ data }) => data)

  return {
    post,
    comments,
    author
  }
}

export default Post
