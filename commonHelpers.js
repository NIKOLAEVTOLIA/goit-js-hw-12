import{a as h,i as p,S as f}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();function g(o){const t=document.createElement("li"),r=document.createElement("img"),a=document.createElement("a"),e=document.createElement("div");return r.src=o.webformatURL,r.alt=o.tags,a.href=o.largeImageURL,a.appendChild(r),e.classList.add("image-info"),e.innerHTML=`
        <p class="likes">Likes <span>${o.likes}</span></p>
        <p class="views">Views <span>${o.views}</span></p>
        <p class="comments">Comments <span>${o.comments}</span></p>
        <p class="downloads">Downloads <span>${o.downloads}</span></p>
    `,t.appendChild(a),t.appendChild(e),t}let c=1;const m=40;let y="",b="41728884-677575adccc9f2c5ba20b621f",u=document.querySelector(".gallery"),i=null;document.querySelector(".form-search").addEventListener("submit",async function(o){o.preventDefault();const t=document.querySelector("span.loader"),r=document.querySelector(".button-loadmore");u.innerHTML="",t.classList.add("visible"),r.classList.remove("visible");const a=document.querySelector(".text-input").value,e={key:b,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:c,per_page:m},n=`https://pixabay.com/api/?${new URLSearchParams(e)}`;try{const l=(await h.get(n)).data;t.classList.remove("visible"),l.hits.length===0?p.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"}):(i&&i.destroy(),l.hits.forEach(v=>{const L=g(v);u.appendChild(L)}),i=new f(".gallery a",{captionsData:"alt",captionDelay:250}),i.refresh(),l.hits.length===m&&r.classList.add("visible")),y=a,c=1}catch(d){console.error("Error fetching search results:",d),t.classList.remove("visible")}});document.querySelector(".button-loadmore").addEventListener("click",async function(){const o=document.querySelector(".loader-loadmore"),t=document.querySelector(".button-loadmore");o.classList.add("visible"),t.classList.remove("visible");try{c++;const r={key:b,q:y,image_type:"photo",orientation:"horizontal",safesearch:!0,page:c,per_page:m},e=`https://pixabay.com/api/?${new URLSearchParams(r)}`,n=(await h.get(e)).data;o.classList.remove("visible"),n.hits.length>0?(i&&i.destroy(),n.hits.forEach(d=>{const l=g(d);u.appendChild(l)}),i=new f(".gallery a",{captionsData:"alt",captionDelay:250}),i.refresh(),S(),c*m>=n.totalHits?(t.classList.remove("visible"),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#3498db"})):t.classList.add("visible")):(t.classList.remove("visible"),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#3498db"}))}catch(r){console.error("Error fetching more results:",r),o.classList.remove("visible"),t.classList.add("visible")}});function S(){const o=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:o*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
