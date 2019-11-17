import React from 'react'
import { title, headerContainer, btnCont } from 'src/shared/components/style'
const Header = ({ children }) => {
  return <header css={headerContainer}>
    <div css={title}>Time Entry App</div>
    <div css={btnCont}>
      {children}
    </div>
  </header>
}

export default Header
