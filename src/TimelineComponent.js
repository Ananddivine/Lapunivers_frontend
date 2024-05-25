
import React, { useEffect, useState } from 'react';
import './Timeline.css';
import processor from'./images/processor.jpeg';
import chiplevel from './images/chiplevel.jpeg';

const TimelineComponent = () => {
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [full, setFull] = useState(false);
  const [setHeight] = useState(0);
  const targetY = window.innerHeight * 0.8;

  useEffect(() => {
    const scrollHandler = () => {
      const scrollY = window.scrollY;
      setUp(scrollY < prevScrollY);
      setDown(!up);

      const timelineRect = document.querySelector('.timelines').getBoundingClientRect();
      const dist = targetY - timelineRect.top;

      if (down && !full) {
        document.querySelector('.lines').style.bottom = `calc(100% - ${Math.min(dist, scrollY)}px)`;
      } else if (!full) {
        const linePosition = Math.max(dist - scrollY, 0);
        document.querySelector('.lines').style.bottom = `${linePosition}px`;
  
        if (linePosition === 0) {
          setFull(false); 
        }
      }

      if (dist > document.querySelector('.timelines').offsetHeight + 50 && !full) {
        setFull(true);
        document.querySelector('.lines').style.bottom = '-50px';
      } 

      
      document.querySelectorAll('.sections').forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top + item.offsetHeight / 5 < targetY) {
          item.classList.add('show-me');
        } else {
          item.classList.remove('show-me');
        }
      });

      setPrevScrollY(window.scrollY);
    };

    scrollHandler();
    document.querySelector('.lines').style.display = 'block';
    window.addEventListener('scroll', scrollHandler);
    

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [down, full, prevScrollY, setHeight, targetY, up]);

  return (
    <section id="time-line">
      <div className="bodys">
        <div className="continers">
        <div className="top-section">
          <h1>Is laptop service necessary<i className="fa fa-2x fa-question"></i></h1>
          <p>Expert's advice that your laptop service is necessary for the long run to keep it healthy and should be done at least once a year. With proper cleaning and proper aid, your laptop is ready for use with lesser risks of sudden breakdowns</p>
        </div>
    
      <div className="timelines">
        <div className="lines"></div>
        <div className='beds'></div>
        <div className="sections"> 
               <img src='images/green.png' alt='img'/>
                <div className="content"> <div className='pfor'>
                <a href='./services'> <p className='buttons'>Do you know?</p></a>
            </div>
              <h2>How often laptops should be serviced<i className="fa fa-2x fa-question"></i></h2>
               <p>It's a good practice to open up your computer and follow the cleaning process at least every three to six months. If you notice that your system has a significant level of dust and hair present the first time you clean it, more frequent cleaning is in order.</p>           
        </div>
        </div>



<div className='divine'>
<h3>"Unlock the power of limitless possibilities with Lapuniverse. Our laptop rental services redefine convenience, offering you the freedom to elevate your business without the burden of ownership. Experience flexibility, efficiency, and innovation at your fingertips, all while embracing a dynamic partnership that fuels your success journey"</h3>
</div>


           
              <div className='processor'>
        <img src={processor} alt='processor' />
              </div>
      
        <div className="sections">
          <img src='images/pink.png' alt='Laptop' />
          <div className="contents">
            <h3>What is unique about a laptop<i className="fa fa-2x fa-question"></i></h3>
            <p>The speciality in laptop computers include light weight and lower energy consumption. Also they are less noisy and easy to handle. Similar to desktop computers the laptop computers include mother board, processor, hard disk, memory, graphic card, keyboard, mouse and display device. ery life etc.</p>
              
          </div>
        </div>
                       
                    <div className='chip'>
             <img src={chiplevel} alt='chip' />
                       </div>
    
        
        <div className="sections"> 
        <img src='images/blue.png' alt='laptop' />
          <div className="contents">
            <div className="box-size">
              <h4 style={{color: 'aqua'}}>LapUniverse</h4>
              <p>With, LapUniverse "Beyond acquiring a mere laptop, you're embarking on a collaborative journey. Our commitment is to empower your business by streamlining the complexities of IT hardware. Opting for our laptops signifies your commitment to this shared vision, fostering seamless workflows and fostering enduring progress."






</p>
            </div>              
          </div>
        </div>




    
      </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineComponent;
    