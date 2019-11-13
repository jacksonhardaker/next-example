import React from 'react'
import Link from 'next/link'
import Minicart from '../Minicart/Minicart'
import ToggleMinicart from '../Minicart/ToggleMinicart'
import products from "../api/products";
import LineItemSansImage from '../Minicart/LineItems/LineItemVariants/LineItemWithoutImage';
import CustomizeLineItems from '../Minicart/LineItems/CustomizeLineItems';
import LineItemOnlyImage from '../Minicart/LineItems/LineItemVariants/LineItemOnlyImage';

const links = [
  { href: 'https://github.com/jacksonhardaker/next-example', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
        <li>
          <ToggleMinicart>
            Cart
        </ToggleMinicart>
        </li>
      </ul>

      {/**
       * Customize by providing no more than a couple of nested components.
       */}
      {/* <Minicart products={products} cart={[17, 5, 11]}>
        <CustomizeLineItems>
          <LineItemSansImage />
        </CustomizeLineItems>
      </Minicart> */}

      {/**
       * Customize by providing callback function and returning fully customized DOM.
       */}
      {/* <Minicart products={products} cart={[17, 5, 11]}>
        <CustomizeLineItems>
          {({ products, cart }) => {
            return (<div>
              {cart.map(id => (
                <LineItemOnlyImage key={id} product={products.find(product => product.id === id)} />
              ))}
            </div>)
          }}
        </CustomizeLineItems>
      </Minicart> */}

      {/**
       * Default usage.
       */}
      <Minicart products={products} cart={[17, 5, 11]} />

      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
    `}</style>
    </nav>
  )
}

export default Nav
