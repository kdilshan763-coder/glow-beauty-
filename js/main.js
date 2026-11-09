
(function(){
  // Sticky header
  var h=document.getElementById('header');
  if(h){window.addEventListener('scroll',function(){h.classList.toggle('scrolled',window.scrollY>40);});}
  // Mobile nav
  var b=document.getElementById('burger'),n=document.getElementById('navLinks');
  if(b&&n){b.addEventListener('click',function(){var open=n.classList.toggle('open');b.classList.toggle('open',open);b.setAttribute('aria-expanded',open);});
    n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false');}});}
  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});els.forEach(function(el){io.observe(el);});}
  else{els.forEach(function(el){el.classList.add('in');});}
  // Hero video fallback
  var v=document.querySelector('.hero video');
  if(v){v.addEventListener('error',function(){v.remove();},true);}
  // FAQ
  document.querySelectorAll('.faq-item button').forEach(function(btn){btn.addEventListener('click',function(){btn.parentElement.classList.toggle('open');});});
  // Contact form (static: opens WhatsApp with enquiry — no backend on GitHub Pages)
  var cf=document.getElementById('contactForm');
  if(cf){cf.addEventListener('submit',function(e){e.preventDefault();
    var hp=cf.querySelector('.honeypot input');var st=document.getElementById('formStatus');
    if(hp&&hp.value){st.textContent='Thank you! Your enquiry has been sent.';st.className='form-status ok';cf.reset();return;}
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var msg='Hello Glow Beauty! New enquiry:%0A%0AName: '+encodeURIComponent(g('cName'))+'%0APhone: '+encodeURIComponent(g('cPhone'))+'%0AEmail: '+encodeURIComponent(g('cEmail'))+'%0ASubject: '+encodeURIComponent(g('cSubject'))+'%0AMessage: '+encodeURIComponent(g('cMsg'));
    window.open('https://wa.me/94776666666?text='+msg,'_blank');
    st.textContent='Opening WhatsApp with your enquiry… (or message us directly at 077 666 6666)';st.className='form-status ok';cf.reset();});}

  // ===== Booking wizard =====
  var wz=document.getElementById('wizard');
  if(wz){
    var state={step:0,service:null,specialist:null,date:null,time:null};
    var services=[
      {id:'haircut',name:'Haircut & Styling',dur:'~1 hour'},
      {id:'colour',name:'Hair Colouring & Highlights',dur:'~2–3 hours'},
      {id:'treatment',name:'Hair Treatments & Keratin',dur:'~2 hours'},
      {id:'spa',name:'Hair Spa & Head Massage',dur:'~1 hour'},
      {id:'wax',name:'Waxing & Hair Removal',dur:'~45 min'},
      {id:'brow',name:'Eyebrow Shaping & Threading',dur:'~20 min'},
      {id:'next',name:'Nail Extensions',dur:'~1.5 hours'},
      {id:'nailart',name:'Nail Art',dur:'~1 hour'},
      {id:'mani',name:'Manicure / Pedicure',dur:'~1 hour'},
      {id:'facial',name:'Facials & Skincare',dur:'~1 hour'},
      {id:'party',name:'Party Makeup',dur:'~1 hour'},
      {id:'bridal-mk',name:'Bridal Makeup',dur:'~2 hours'},
      {id:'lashes',name:'Eyelash Extensions & Lash Lift',dur:'~1 hour'}
    ];
    var specialists=[{id:'any',name:'Any available specialist',note:'Fastest option'},
      {id:'s1',name:'Specialist profile coming soon',note:'Assign via owner dashboard in the full app'},
      {id:'s2',name:'Specialist profile coming soon',note:'Assign via owner dashboard in the full app'}];
    function slotTimes(){
      var out=[];for(var hr=9;hr<18;hr++){['00','15','30','45'].forEach(function(m){if(hr===17&&m!=='00'&&m!=='15'&&m!=='30'&&m!=='45')return;out.push((hr<10?'0':'')+hr+':'+m);});}
      return out;
    }
    function nextWeekdays(){
      var out=[],d=new Date();var f=new Date(d);f.setDate(f.getDate()+1);
      while(out.length<5){var day=f.getDay();if(day!==0){var iso=f.toISOString().slice(0,10);var label=f.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});out.push({iso:iso,label:label});}f.setDate(f.getDate()+1);}
      return out;
    }
    function render(){
      var bars=wz.querySelectorAll('.steps span');bars.forEach(function(b,i){b.classList.toggle('on',i<=state.step);});
      var body=wz.querySelector('#wzBody');
      if(state.step===0){
        body.innerHTML='<h3>Choose your service</h3><div class="choice-list">'+services.map(function(s){
          return '<div class="choice" data-id="'+s.id+'"><div><strong>'+s.name+'</strong><small>Estimated duration '+s.dur+' · Price to be confirmed by salon</small></div><span style="color:var(--gold)">›</span></div>';}).join('')+'</div>';
        body.querySelectorAll('.choice').forEach(function(c){c.addEventListener('click',function(){state.service=services.find(function(s){return s.id===c.dataset.id;});state.step=1;render();});});
      } else if(state.step===1){
        body.innerHTML='<h3>Choose your specialist</h3><div class="choice-list">'+specialists.map(function(s){
          return '<div class="choice" data-id="'+s.id+'"><div><strong>'+s.name+'</strong><small>'+s.note+'</small></div><span style="color:var(--gold)">›</span></div>';}).join('')+'</div>';
        body.querySelectorAll('.choice').forEach(function(c){c.addEventListener('click',function(){state.specialist=specialists.find(function(s){return s.id===c.dataset.id;});state.step=2;render();});});
        nav(body,true);
      } else if(state.step===2){
        var days=nextWeekdays();
        body.innerHTML='<h3>Pick a date</h3><p style="color:#9a948a;font-size:.85rem;margin-bottom:16px">Open Monday–Saturday, 9:00 AM – 6:00 PM · Sunday closed</p><div class="choice-list">'+days.map(function(d){
          return '<div class="choice" data-iso="'+d.iso+'"><div><strong>'+d.label+'</strong></div><span style="color:var(--gold)">›</span></div>';}).join('')+'</div>';
        body.querySelectorAll('.choice').forEach(function(c){c.addEventListener('click',function(){state.date=c.dataset.iso;state.step=3;render();});});
        nav(body,true);
      } else if(state.step===3){
        body.innerHTML='<h3>Pick a time</h3><p style="color:#9a948a;font-size:.85rem;margin-bottom:16px">15-minute booking intervals · 2-hour minimum advance notice</p><div class="slot-grid">'+slotTimes().map(function(t){
          return '<div class="slot" data-t="'+t+'">'+t+'</div>';}).join('')+'</div>';
        body.querySelectorAll('.slot').forEach(function(c){c.addEventListener('click',function(){state.time=c.dataset.t;state.step=4;render();});});
        nav(body,true);
      } else {
        var nice=new Date(state.date+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
        body.innerHTML='<h3>Review your request</h3><div class="choice-list">'
          +'<div class="choice"><div><strong>Service</strong><small>'+state.service.name+' ('+state.service.dur+')</small></div></div>'
          +'<div class="choice"><div><strong>Specialist</strong><small>'+state.specialist.name+'</small></div></div>'
          +'<div class="choice"><div><strong>Date &amp; time</strong><small>'+nice+' at '+state.time+'</small></div></div></div>'
          +'<p class="wz-note">This static site sends your request via WhatsApp — the salon confirms availability personally. Prices are confirmed at the salon. Cancellations require 24 hours’ notice. To reschedule, please WhatsApp or call 077 666 6666.</p>';
        nav(body,true,true);
        var cf2=body.querySelector('#wzConfirm');
        cf2.addEventListener('click',function(){
          var msg='Hello Glow Beauty! I would like to request an appointment:%0A%0AService: '+encodeURIComponent(state.service.name)
            +'%0ASpecialist: '+encodeURIComponent(state.specialist.name)
            +'%0ADate: '+encodeURIComponent(nice)+'%0ATime: '+encodeURIComponent(state.time)
            +'%0A%0APlease confirm availability. Thank you!';
          window.open('https://wa.me/94776666666?text='+msg,'_blank');
          body.querySelector('#wzDone').textContent='Opening WhatsApp… If it did not open, message 077 666 6666 directly.';body.querySelector('#wzDone').className='form-status ok';
        });
      }
    }
    function nav(body,back,confirm){
      var wrap=document.createElement('div');wrap.className='wz-nav';
      wrap.innerHTML=(back?'<button class="btn" id="wzBack" type="button">← Back</button>':'<span></span>')
        +(confirm?'<button class="btn solid" id="wzConfirm" type="button">Confirm via WhatsApp</button>':'');
      body.appendChild(wrap);
      var done=document.createElement('p');done.id='wzDone';done.className='form-status';body.appendChild(done);
      var bk=wrap.querySelector('#wzBack');
      if(bk)bk.addEventListener('click',function(){state.step=Math.max(0,state.step-1);render();});
    }
    render();
  }
})();
