import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
      </ul>
    : null
}

function ActionLinks ({isAuthed, uid}) {
  return isAuthed === true
    ? <ul>
        <li><Link className={link} to='/studionew'>{'Add Studio'}</Link></li>
        <li><Link className={link} to={`/userstudios/${uid}`}>{'Studios'}</Link></li>
        <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
        <li><Link className={link} to='/auth'>{'Authenticate'}</Link></li>
      </ul>
}

export default function Navigation ({isAuthed, uid}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed}/>
        <ActionLinks isAuthed={isAuthed} uid={uid} />
      </nav>
    </div>
  )
}
