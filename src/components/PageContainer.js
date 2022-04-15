import React, { useState,useEffect } from 'react';
import ImageContainer from './imageContainer';

export default function PageContainer(){

   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);
   const makeApiCall = () =>{
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`).then((res)=>{res.json().then((result)=>{ const newData = [...data, ...result]; setData(newData);})}).catch((err) => console.log(err));
    }
    useEffect(()=>{
         makeApiCall(page);
    },[page]); 

    const dragstart = (e) => {
        e.preventDefault();
        console.log('e',e);
        console.log('brother');
    }



    useEffect(()=>{     
        const scrollEventListner = (entries) => {
            console.log(entries);
            entries.map((entry) => {
             if (entry.isIntersecting) {
               // console.log('Log event')
               setPage((page)=> page+1);
               // observer.unobserve(entry.target);
             }
           });
         }
         let options={}
         let observer = new IntersectionObserver(scrollEventListner,{
            threshold: 0.5,
          });
            let target = document.querySelector('#scrollIdentifier');
            let targetImage = data.length && document.querySelector('.productImage');
            targetImage.length && targetImage.map((elm)=>observer.observe(elm));
            observer.observe(target);
            // observer.observe(targetTop);
            let pStart = {
                x: 0,
                y: 0
             };
             let pStop = {
                x: 0,
                y: 0
             };
             
             function swipeStart(e) {
                if (typeof e["targetTouches"] !== "undefined") {
                    console.log('touch', e);
                   var touch = e.targetTouches[0];
                   pStart.x = touch.screenX;
                   pStart.y = touch.screenY;
                } else {
                   pStart.x = e.screenX;
                   pStart.y = e.screenY;
                }
             }
             
             function swipeEnd(e) {
                if (typeof e["changedTouches"] !== "undefined") {
                   var touch = e.changedTouches[0];
                   pStop.x = touch.screenX;
                   pStop.y = touch.screenY;
                } else {
                   pStop.x = e.screenX;
                   pStop.y = e.screenY;
                }
             
                swipeCheck();
             }
             
             function swipeCheck() {
                var changeY = pStart.y - pStop.y;
                var changeX = pStart.x - pStop.x;
                if (isPullDown(changeY, changeX)) {
                   setPage(0);
                   setData([]);
                }
             }
             
             function isPullDown(dY, dX) {
                // methods of checking slope, length, direction of line created by swipe action
                return (
                   dY < 0 &&
                   ((Math.abs(dX) <= 100 && Math.abs(dY) >= 100) ||
                      (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
                );
             }
             
             document.addEventListener(
                "touchstart",
                function(e) {
                    console.log("hohohohoho");
                   swipeStart(e);
                },
                false
             );
             document.addEventListener(
                "touchend",
                function(e) {
                   swipeEnd(e);
                },
                false
             );
    },[]);

    // console.log('data',data);

    return <div draggable style={{position: 'relative'}} onDragStart={(e)=>dragstart(e)}>
        <div id='targetTop' style={{height:'50px'}}></div>
        <h1> Image scroller app</h1>
        {
        data.map((item)=>{
            return(
                <ImageContainer url={item.download_url}/>
            )
        }) }
        {!data.length && <div style={{height: '1000px'}}> </div>}
        {<div id='scrollIdentifier' style={{height:'100px', paddingBottom:'10px'}}></div>}
        </div>
        
}