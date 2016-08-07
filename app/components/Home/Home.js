import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Bookfit'}</p>
      <p className={slogan}>{'Client bookings for the Fitness industry'}</p>
    </div>
  )
}
