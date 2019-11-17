// @flow
import React from 'react'

const HTML = ({
  children,
  header
}) => {
  return (
    <html lang='en'>
      <head>
        {header}
        <link rel="stylesheet" href="https://rawgit.com/arqex/react-datetime/master/css/react-datetime.css"></link>
      </head>
      <body>
        <div id='app' className='app' dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = __STATE__`
          }}
        />
        __SCRIPTS__
      </body>
    </html >)
}

export default HTML
