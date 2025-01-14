// @ts-nocheck

"use client"

import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
  const router = useRouter()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  

  const getCalls = () => {
    switch(type) {
      case 'ended':
        return endedCalls;
        break;
      case 'recordings': 
        return  recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  }

  const getNoCallsMessage = () => {
    switch(type) {
      case 'ended':
        return "No Previous calls";
        break;
      case 'recordings': 
        return  "No Recordings";
      case 'upcoming':
        return "No Upcoming calls";
      default:
        return "";
    }
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if(isLoading) return <Loader />

  
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id}
          icon={
            type === "ended" 
            ? '/icons/previous.svg'
            : type === "upcoming"
            ? '/icons/upcoming.svg'
            : '/icons/recordings.svg'
          }
          title={(meeting as Call).state.custom.description.substring(0, 26) || ' No description'}
          date={meeting.state.startsAt.toLocaleString() || start_time.toLocaleString()}
          isPreviousMeeting={ type === "ended"}
          buttonIcon1={ type === "recordings" ? '/icons/play.svg' : undefined }
          buttonText={ type === "recordings" ? 'Play' : 'Start'}
          handleClick={ type === "recordings" ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
          link={type === "recordings" ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
        />
      )): (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList