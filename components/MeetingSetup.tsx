'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetupComplete}: { setIsSetupComplete: (value: boolean) => void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)

  const call = useCall();

  if(!call) {
    throw new Error("usecall must be used within the stream call component")
  }
  useEffect(() => {
    if(isMicCamToggledOn){
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }

  }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex h-26 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input 
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <button className='rounded-md bg-green-500 px-4 py-2.5' 
        onClick={() => 
          {
            call.join()

            setIsSetupComplete(true)
          }
        }>
        join meeting
      </button>
    </div>
  )
}

export default MeetingSetup
