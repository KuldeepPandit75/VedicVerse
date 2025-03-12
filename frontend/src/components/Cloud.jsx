import React, { useEffect } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { useDispatch, useSelector } from 'react-redux'
import { setGameLoading } from '../features/vedicSlice';

function Cloud() {

    const gameState=useSelector(state=>state.gameLoading);
    const dispatch=useDispatch();

    setTimeout(()=>{
        dispatch(setGameLoading(false))
    },2000)


        useGSAP(()=>{

            if(gameState){

                const tl=gsap.timeline();
                
                tl.to('.cloud1',{
                    x:-1100,
                    ease:'power1.inOut',
                })
                tl.to('.cloud2',{
                    x:950,
                    ease:'power1.inOut',

                },"<")
                tl.to('.cloud3',{
                    x:-1100,
                    ease:'power1.inOut',

                },"<")
                tl.to('.cloud4',{
                    x:1200,
                    ease:'power1.inOut',

                },"<")
                tl.to('.cloud5',{
                    x:-1100,
                    ease:'power1.inOut',

                },"<")
                tl.to('.cloud6',{
                    x:1200,
                    ease:'power1.inOut',
                },"<")
                setTimeout(()=>{
                    
                    tl.reverse();
                },3000)
                
            }
        },[gameState])

  return (
    <div className='absolute top-0 w-full overflow-hidden h-full z-[100] pointer-events-none'>
        <img src='./meta elements/cloud.png' className='cloud1 absolute -bottom-[10vw] -right-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud2 absolute -top-[10vw] -left-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud3 absolute -top-[20vw] -right-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud4 absolute -bottom-[20vh] -left-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud5 absolute -bottom-[0vw] -right-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud6 absolute -bottom-[10vh] -left-[100vw]'/>
        <img src='./meta elements/cloud.png' className='cloud6 absolute bottom-[10vw] -left-[100vw]'/>
    </div>
  )
}

export default Cloud
