import React, { useEffect } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { useSelector } from 'react-redux'

function Cloud() {

    const gameState=useSelector(state=>state.gameLoading);


        useGSAP(()=>{

            if(gameState){

                const tl=gsap.timeline();
                
                tl.to('.cloud1',{
                    x:-1400,
                    ease:'power1.inOut'
                })
                tl.to('.cloud2',{
                    x:1300,
                    ease:'power1.inOut'

                },"<")
                tl.to('.cloud3',{
                    x:-1200,
                    ease:'power1.inOut'

                },"<")
                tl.to('.cloud4',{
                    x:1200,
                    ease:'power1.inOut'

                },"<")
                tl.to('.cloud5',{
                    x:-1400,
                    ease:'power1.inOut'

                },"<")
                tl.to('.cloud6',{
                    x:1200,
                    ease:'power1.inOut'
                },"<")
                setTimeout(()=>{
                    
                    tl.reverse();
                },3000)
                
            }
        },[gameState])

  return (
    <div className='absolute top-0 w-full overflow-hidden h-full z-[100] pointer-events-none'>
        <img src='./meta elements/cloud.png' className='cloud1 absolute -bottom-[20vh] -right-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud2 absolute -top-[40vh] -left-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud3 absolute -top-[40vh] -right-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud4 absolute -bottom-[20vh] -left-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud5 absolute -bottom-[10vh] -right-[240vh]'/>
        <img src='./meta elements/cloud.png' className='cloud6 absolute -bottom-[10vh] -left-[240vh]'/>
    </div>
  )
}

export default Cloud
