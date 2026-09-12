'use client';
import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Loader} from './Loader';
import {Navbar} from './Navbar';
import {Footer} from './Footer';
gsap.registerPlugin(ScrollTrigger);
export function SiteShell({children}:{children:React.ReactNode}){const root=useRef<HTMLDivElement>(null);useEffect(()=>{const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>{gsap.fromTo(el,{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}})});gsap.utils.toArray<HTMLElement>('.magnetic').forEach(el=>{const move=(e:MouseEvent)=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14,duration:.35,ease:'power2.out'})};const leave=()=>gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'});el.addEventListener('mousemove',move);el.addEventListener('mouseleave',leave);return()=>{el.removeEventListener('mousemove',move);el.removeEventListener('mouseleave',leave)}})},root);return()=>ctx.revert()},[]);return <div ref={root}><Loader/><Navbar/>{children}<Footer/></div>}
