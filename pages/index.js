import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'
import GlobalStyles from '../components/styles'
import DropDownSelector from '../components/DropDownSelector'

const Posts = ({ posts, authors }) => {
  const [currentPosts, setCurrentPosts] = useState(posts)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const onChange = name => {
    if (name) {
      const author = authors.find(author => author.name === name)
      setSelectedAuthor(author.id)
    }
    else {
      setSelectedAuthor(null)
    }
  }

  useEffect(() => {
    if (selectedAuthor) {
      setCurrentPosts(posts.filter(post => post.userId === selectedAuthor))
    }
    else {
      setCurrentPosts(posts)
    }
  }, [selectedAuthor, setCurrentPosts, posts])

  return (
    <div>
      <Head>
        <title>All Posts</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />

      <div className='hero'>
        <h1 className='title'>Posts</h1>

        <div className='description'>
          <DropDownSelector selectOptions={['', ...authors.map(author => author.name)]} onChange={onChange} />
        </div>

        <div className='row'>
          {currentPosts.map((post, index) => (
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
}

Posts.getInitialProps = async () => {
  const posts = await axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then(({ data }) => data)

  const authors = await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(({ data }) => data)

  return {
    posts,
    authors
  }
}

export default Posts
