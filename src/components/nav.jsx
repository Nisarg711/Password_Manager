import React from 'react'
import './nav.css'
const nav = () => {
  return (
    <nav>
      <div className="logo"><span className='gr'>&lt;</span>Pass<span className='gr'>N&beta;/&gt;</span></div>
      <a className="git"  target='blank' href="https://github.com/Nisarg711" ><div className='gitbtn'><img src="./icons/git2.png" alt="" /><div style={{color:"white", textAlign:'center', fontSize:'18px',top:'4px', position:'relative'}}>Github</div></div></a>
    </nav>
  )
}

export default nav
