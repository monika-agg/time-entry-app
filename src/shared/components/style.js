import {css, Global} from '@emotion/core'
import React from 'react'
export const headerContainer = css`
  background: #657c87;
    padding: 10px;
`
export const loginContainer = css`
    margin: 20px auto;
    width: 400px;
    position: relative;
    padding: 20px;
    border: 1px solid #e3edf6;
    border-radius: 2px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

`
export const timer = css`
position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 10px 0;
    color: red;
`
export const loginBtn = css`
  background: #657c87;
  color: white;
  text-transform: capitalize;
  margin: 20px 0 0;
  padding: 10px;
`
export const title = css`
  display: inline-block;
    vertical-align: top;
    font-size: 20px;
    color: white;
    font-weight: 300;
`

export const btnCont = css`
    display: inline-block;
    float: right;
`
const globals = () => css`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
  }

  ::before,
  ::after {
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }
  html {
    font-size: 14px;
  }

  body {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-style: normal;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select {
    outline: none;
  }
  button {
      border: none;
      padding: 4px 7px;
      margin: 0 6px;
      cursor: pointer;
      border-radius: 2px;
    }
  a {
    border: none;
    outline: none;
  }
  .app {
    height: 100%;
  }
  ul {
    list-style: none;
  }
  label {
    font-size: 12px;
    color: #92a5b7;
    display: block;
  }
  label+input+label, label+.rdt+label {
    margin-top: 15px;
  }
  h2 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
    color: #596a7b;
  }
  input, select {
    border: none;
    border-radius: 0;
    outline: none;
    border-bottom: 1px solid #92a1a8;
    padding: 6px 10px 6px 0;
    appearance: none;
    background: transparent;
    display: block;
    color: #20282f;
    width: 100%;
  }
`
export const table = css`
    margin: auto;
        text-align: center;
        border-collapse: collapse;
        border: 1px solid #ddd;
        border-radius: 2px;
    th, td {
        padding: 5px;
        border-bottom: 1px solid #dddddd;
    }
    th {
      font-weight: 500;
    }
    tr:nth-of-type(even) {
      background-color: #e8e8e8;
    }
`
export const errorStyle = css`
    font-size: 12px;
    color: red;
    display: block;
    margin-top: 10px;
`
export const Core = () => (
    <Global styles={globals()} />
)
