import{r as s,c as e,h as t,H as l}from"./p-643cfe3b.js";const o=class{constructor(t){s(this,t),this.sharedEvent=e(this,"sharedEvent",7)}clickHandler(){console.log("hallo"),this.sharedEvent.emit("eventTest")}sharedEventHandler(s){console.log(s)}render(){return t(l,null,t("div",{onClick:this.clickHandler.bind(this)},t("slot",null)))}};o.style=":host{display:block}";export{o as shared_image}