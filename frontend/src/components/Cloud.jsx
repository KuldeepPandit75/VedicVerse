import React, { useEffect } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

function Cloud({loadingState,setLoadingState}) {

    const changeScreen=()=>{

        useGSAP(()=>{
            const tl=gsap.timeline();
            
            tl.to('.cloud1',{
                x:-1400,
            })
            tl.to('.cloud2',{
                x:1300,
            },"<")
            tl.to('.cloud3',{
                x:-1200,
            },"<")
            tl.to('.cloud4',{
                x:1200,
            },"<")
            setTimeout(()=>{
                
                tl.reverse();
            },2000)
            
        })
    }
    
    useEffect(()=>{
        console.log(loadingState)    
        if(loadingState){
    
            changeScreen();
        }
    },[loadingState])

  return (
    <div className='absolute top-0 w-full overflow-hidden h-full z-[100] pointer-events-none'>
        <img src='./meta elements/cloud.png' className='cloud1 absolute -bottom-[20vh] -right-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud2 absolute -top-[40vh] -left-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud3 absolute -top-[40vh] -right-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud4 absolute -bottom-[20vh] -left-[240vh]'/>
    </div>
  )
}

export default Cloud
