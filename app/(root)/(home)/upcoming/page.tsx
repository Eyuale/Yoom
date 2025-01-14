import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <div className='text-3xl font-bold'>
      Upcoming
    </div>

    <CallList type="upcoming"/>    
  </section>
  )
}

export default Upcoming