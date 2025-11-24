document.addEventListener("DOMContentLoaded",function(){let t=document.querySelector(".nav__hamburger"),n=document.querySelector(".nav__menu");var e=document.querySelector(".menu-close");let o=document.body;function s(){t.classList.remove("active"),n.classList.remove("active"),o.classList.remove("no-scroll")}t&&n&&(t.addEventListener("click",function(e){e.stopPropagation(),n.classList.contains("active")?s():(t.classList.add("active"),n.classList.add("active"),o.classList.add("no-scroll"))}),e&&e.addEventListener("click",function(e){e.stopPropagation(),s()}),document.querySelectorAll(".nav__menu a").forEach(e=>{e.addEventListener("click",()=>{s()})}),document.addEventListener("click",function(e){!n.classList.contains("active")||n.contains(e.target)||t.contains(e.target)||s()}),n.addEventListener("click",function(e){e.stopPropagation()}),document.addEventListener("keydown",function(e){"Escape"===e.key&&n.classList.contains("active")&&s()}));let a=window.scrollY,r=document.querySelector(".header");window.addEventListener("scroll",()=>{var e;r&&((e=window.scrollY)>a&&100<e?r.style.transform="translateY(-100%)":r.style.transform="translateY(0)",100<window.scrollY?(r.style.background="rgba(255, 255, 255, 0.98)",r.style.boxShadow="0 2px 20px rgba(0, 0, 0, 0.1)"):(r.style.background="rgba(255, 255, 255, 0.95)",r.style.boxShadow="none"),a=e)}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();var t,e=this.getAttribute("href");"#"!==e&&(e=document.querySelector(e))&&(window.innerWidth<=960&&s(),t=r?r.offsetHeight:0,e=e.offsetTop-t-20,window.scrollTo({top:e,behavior:"smooth"}))})});e=document.querySelector(".contact-form");function i(e,t="info"){var n=document.querySelector(".notification");n&&n.remove();let o=document.createElement("div");o.className="notification notification--"+t,o.innerHTML=`
            <div class="notification__content">
                <span class="notification__message">${e}</span>
                <button class="notification__close">&times;</button>
            </div>
        `,o.style.cssText=`
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${"error"===t?"#f8d7da":"success"===t?"#d1edff":"#fff3cd"};
            border: 1px solid ${"error"===t?"#f5c6cb":"success"===t?"#b8daff":"#ffeaa7"};
            color: ${"error"===t?"#721c24":"success"===t?"#004085":"#856404"};
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `,document.body.appendChild(o);n=o.querySelector(".notification__close");n.style.cssText=`
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            color: inherit;
        `,n.addEventListener("click",()=>{o.style.animation="slideOutRight 0.3s ease",setTimeout(()=>o.remove(),300)}),setTimeout(()=>{o.parentNode&&(o.style.animation="slideOutRight 0.3s ease",setTimeout(()=>o.remove(),300))},5e3)}e&&e.addEventListener("submit",function(e){e.preventDefault();new FormData(this);e={name:this.querySelector('input[type="text"]').value,phone:this.querySelector('input[type="tel"]').value,email:this.querySelector('input[type="email"]').value,message:this.querySelector("textarea").value};if(e.name&&e.phone)if(/^[\+]?[0-9\s\-\(\)]{10,}$/.test(e.phone.replace(/\s/g,"")))if(e.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email))i("Пожалуйста, введите корректный email","error");else{let e=this.querySelector('button[type="submit"]'),t=e.textContent;e.textContent="Отправка...",e.disabled=!0,e.classList.add("loading"),setTimeout(()=>{i("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.","success"),this.reset(),e.textContent=t,e.disabled=!1,e.classList.remove("loading")},2e3)}else i("Пожалуйста, введите корректный номер телефона","error");else i("Пожалуйста, заполните обязательные поля: Имя и Телефон","error")});e=document.createElement("style");e.textContent=`
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification__message {
            flex: 1;
        }
    `,document.head.appendChild(e);let l=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)",e.target.classList.add("visible"))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".service-card, .portfolio-item, .about-feature, .feature").forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.6s ease, transform 0.6s ease",l.observe(e)});e=document.querySelectorAll(".feature h3");let c=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let s=e.target;if(!s.dataset.animated){s.dataset.animated="true";let e=parseInt(s.textContent),t=0;let n=e/125,o=setInterval(()=>{(t+=n)>=e?(s.textContent=e+"+",clearInterval(o)):s.textContent=Math.floor(t)+"+"},16)}}})},{threshold:.5}),d=(e.forEach(e=>{c.observe(e)}),document.querySelectorAll('input[type="tel"]').forEach(e=>{e.addEventListener("input",function(t){let n=t.target.value.replace(/\D/g,"");if(0===n.length)t.target.value="";else{let e="";0<(n=n.startsWith("7")||n.startsWith("8")?n.substring(1):n).length&&(e="+7 "),0<n.length&&(e+=n),16<(e=13<(e=10<(e=6<e.length?e.substring(0,6)+" "+e.substring(6):e).length?e.substring(0,10)+" "+e.substring(10):e).length?e.substring(0,13)+" "+e.substring(13):e).length&&(e=e.substring(0,16)),t.target.value=e}})}),document.querySelectorAll("section[id]")),u=document.querySelectorAll('.nav__menu a[href^="#"]');window.addEventListener("scroll",function(){let o="",s=window.pageYOffset;d.forEach(e=>{var t=e.offsetHeight,n=e.offsetTop-100;s>=n&&s<n+t&&(o=e.getAttribute("id"))}),u.forEach(e=>{e.classList.remove("active"),e.getAttribute("href")==="#"+o&&e.classList.add("active")})});e=document.createElement("style");e.textContent=`
        .nav__menu a.active {
            color: var(--secondary-color);
        }
        
        @media (max-width: 960px) {
            .nav__menu.active a.active {
                color: var(--secondary-color);
            }
        }
    `,document.head.appendChild(e),document.querySelectorAll(".portfolio-item").forEach(e=>{e.addEventListener("mouseenter",function(){this.style.transform="translateY(-10px)",this.style.boxShadow="0 20px 40px rgba(0, 0, 0, 0.15)"}),e.addEventListener("mouseleave",function(){this.style.transform="translateY(-5px)",this.style.boxShadow="var(--shadow)"})});let m=document.createElement("button");m.innerHTML="↑",m.style.cssText=`
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary-color);
        color: var(--primary-color);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `,m.addEventListener("mouseenter",function(){this.style.transform="translateY(-5px)",this.style.boxShadow="0 6px 20px rgba(0,0,0,0.2)"}),m.addEventListener("mouseleave",function(){this.style.transform="translateY(0)",this.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)"}),m.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),document.body.appendChild(m),window.addEventListener("scroll",function(){300<window.pageYOffset?(m.style.opacity="1",m.style.visibility="visible"):(m.style.opacity="0",m.style.visibility="hidden")}),console.log("🏗️ EliteBuild - Construction company website loaded successfully")});