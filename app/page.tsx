"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SocialLinks } from "../components/social-links";
const scenes = [
 {start:0,end:2.2,title:"Care lends\na hand.",label:"Neighbors showing up for neighbors",position:"low",counter:""},
 {start:4.4,end:6.6,title:"Care fills\na pantry.",label:"Dozens of families helped",position:"high",counter:"families"},
 {start:8,end:10.6,title:"Care brings\na little joy.",label:"A little kindness. A lasting difference.",position:"high",counter:""},
 {start:12.5,end:15.04,title:"Care brings\nus together.",label:"",position:"low",counter:"money"},
];
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export default function Home(){
 const section=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null);
 const [time,setTime]=useState(0),[reduced,setReduced]=useState(false),[failed,setFailed]=useState(false),[loaded,setLoaded]=useState(false),[mobilePlayback,setMobilePlayback]=useState(false),[autoplayRejected,setAutoplayRejected]=useState(false);
 useEffect(()=>{const q=matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(q.matches);update();q.addEventListener("change",update);return()=>q.removeEventListener("change",update)},[]);
 useEffect(()=>{const ua=navigator.userAgent;const frame=requestAnimationFrame(()=>setMobilePlayback(/Android|iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1)));return()=>cancelAnimationFrame(frame)},[]);
 useEffect(()=>{
  if(reduced||failed||mobilePlayback)return;
  let frame=0,target=0;const el=video.current!;
  el.pause();
  const seek=()=>{const desired=Math.min(target,Math.max(0,el.duration-.04));if(el.readyState>=1&&!el.seeking&&Math.abs(el.currentTime-desired)>.035)el.currentTime=desired};
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!section.current)return;const r=section.current.getBoundingClientRect();target=clamp(-r.top/Math.max(1,r.height-innerHeight))*15.04;seek()})};
  const ready=()=>{setLoaded(true);update()},sought=()=>{setTime(el.currentTime);seek()};
  el.addEventListener("loadedmetadata",ready);el.addEventListener("seeked",sought);if(el.readyState>=1)ready();
  addEventListener("scroll",update,{passive:true});addEventListener("resize",update);update();
  return()=>{cancelAnimationFrame(frame);removeEventListener("scroll",update);removeEventListener("resize",update);el.removeEventListener("loadedmetadata",ready);el.removeEventListener("seeked",sought)};
 },[reduced,failed,mobilePlayback]);
 useEffect(()=>{
  if(!mobilePlayback||reduced||failed)return;
  const el=video.current!;let frame=0,tracking=false;
  const tick=()=>{setTime(el.currentTime);frame=requestAnimationFrame(tick)};
  const playing=()=>{if(tracking)return;tracking=true;setLoaded(true);setAutoplayRejected(false);cancelAnimationFrame(frame);frame=requestAnimationFrame(tick)};
  const play=()=>{el.defaultMuted=true;el.muted=true;el.playbackRate=.65;void el.play().catch(()=>{setLoaded(true);setAutoplayRejected(true)})};
  el.addEventListener("playing",playing);
  el.addEventListener("canplay",play,{once:true});if(el.readyState>=3)play();
  return()=>{cancelAnimationFrame(frame);el.removeEventListener("playing",playing);el.removeEventListener("canplay",play)};
 },[mobilePlayback,reduced,failed]);
 const resumeMobilePlayback=()=>{const el=video.current;if(!el)return;el.defaultMuted=true;el.muted=true;el.playbackRate=.65;void el.play().catch(()=>setAutoplayRejected(true))};
 const staticMode=reduced||failed;
 return <main>
  <a className="skip" href="#community">Skip the film</a>
  <header className="site-header cinematic-header"><Link className="brand" href="/" aria-label="Tolland Cares home">tolland<span>cares.</span></Link><div className="header-actions"><nav aria-label="Main navigation"><a href="#community">Our Community</a><a href="#contact">Contact</a></nav><SocialLinks /></div></header>
  <section ref={section} className={`story ${staticMode?"static":""} ${mobilePlayback?"mobile-auto":""}`} aria-label="Care takes many forms"><div className="stage">
   <video ref={video} className="film" src="/care-journey.mp4" poster="/care-poster.jpg" muted playsInline preload="auto" autoPlay loop onError={()=>setFailed(true)} aria-hidden="true"/>
   <div className="shade"/>
   {scenes.map((s,i)=>{const p=clamp((time-s.start)/(s.end-s.start));const opacity=staticMode?(i===0?1:0):i===0&&time<.2?1:clamp((time-s.start)/.28)*(i===3?1:clamp((s.end-time)/.32));const amount=s.counter==="money"?`$${Math.floor(11000+p*37000).toLocaleString("en-US")}`:`${Math.floor(12+p*64)}`;return <div key={s.title} className={`caption ${s.position}`} style={{opacity,transform:`translateY(${(1-opacity)*18}px)`}} aria-hidden={opacity<.5}><p className="chapter">0{i+1} / THE WAYS WE CARE</p>{i===0?<h1>{s.title}</h1>:<h2>{s.title}</h2>}{s.counter&&!staticMode&&<div className="counter" style={{opacity:clamp(p/.18)*clamp((.91-p)/.18)}} aria-hidden="true"><strong>{amount}</strong><span>{s.counter==="money"?"money raised":"families helped"}</span></div>}{s.label&&<p className="scene-label">{s.label}</p>}</div>})}
    {mobilePlayback&&autoplayRejected&&!staticMode&&<button className="play-story" type="button" onClick={resumeMobilePlayback}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z"/></svg><span>Play story</span></button>}
    <div className="film-footer"><span>{staticMode?"A community built on kindness":!loaded?"Preparing the story…":mobilePlayback?"Care in motion":"Scroll to see care in motion ↓"}</span></div><div className="timeline" aria-hidden="true"><div style={{width:`${time/15.04*100}%`}}/></div>
  </div></section>
  <section id="community" className="community"><p className="eyebrow">MANY HANDS. ONE COMMUNITY.</p><h2>A little help.<br/><em>A whole lot of heart.</em></h2><div className="community-copy"><p>From a freshly raked yard to a bag of groceries. From a gift wrapped with care to neighbors coming together to raise support. Care takes many forms in Tolland.</p><p>We’re local residents giving our time and resources to help one another. And there’s always room for another pair of hands.</p><a href="mailto:george@tollandcares.com">Be part of the next good thing <svg className="action-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></div><div className="impact"><div><strong>Tens of thousands</strong><span>of dollars raised</span></div><div><strong>Dozens</strong><span>of families helped</span></div></div></section>
  <footer id="contact" className="footer"><Link className="brand" href="/">tolland<span>cares.</span></Link><p>Neighbors helping neighbors.<br/>Tolland, Connecticut.</p><div className="footer-actions"><address className="footer-contact"><span>Contact</span><a href="tel:+18602341501">(860) 234-1501</a><a href="mailto:george@tollandcares.com">george@tollandcares.com</a></address><SocialLinks /></div></footer>
 </main>;
}
