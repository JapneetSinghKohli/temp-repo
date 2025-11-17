"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},23437:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>v,patchFetch:()=>A,requestAsyncStorage:()=>y,routeModule:()=>w,serverHooks:()=>E,staticGenerationAsyncStorage:()=>g});var n={};r.r(n),r.d(n,{POST:()=>m});var o=r(49303),s=r(88716),a=r(60670),i=r(87070),u=r(34248),c=r(20147),l=r(51592),p=r(20402);let d=(e,t)=>new c.XQ({name:"google_search",description:"Search Google for current information about courses, assignments, deadlines, and academic topics.",schema:l.object({query:l.string().describe("The search query")}),func:async({query:r})=>{try{let n=`https://www.googleapis.com/customsearch/v1?key=${e}&cx=${t}&q=${encodeURIComponent(r)}`,o=await fetch(n),s=await o.json();if(s.items&&s.items.length>0)return s.items.slice(0,3).map(e=>`Title: ${e.title}
Snippet: ${e.snippet}
Link: ${e.link}`).join("\n\n");return"No results found."}catch(e){return console.error("Search error:",e),"Error performing search."}}});async function h(e,t,r){let n=p.ks.fromTemplate(`You are a helpful AI learning assistant for college courses. 
    
User question: {query}

Do you need to search for current information to answer this question? 
If the question is about:
- Current course schedules, deadlines, or assignments
- Recent topics or updates
- Specific factual information you're unsure about

Respond with ONLY "SEARCH: <search query>" if you need to search, or "ANSWER: <your answer>" if you can answer directly.`),o=(await e.invoke(await n.format({query:r}))).content.toString();if(o.startsWith("SEARCH:")){let n=o.replace("SEARCH:","").trim(),s=t[0],a=await s.func({query:n}),i=p.ks.fromTemplate(`You are a helpful AI learning assistant for college courses.

User question: {query}

Search results:
{searchResults}

Based on the search results above, provide a comprehensive and friendly answer to the student's question. Be conversational and supportive.`);return(await e.invoke(await i.format({query:r,searchResults:a}))).content.toString()}return o.startsWith("ANSWER:")?o.replace("ANSWER:","").trim():o}async function f(e,t,r,n,o){try{if(!t)throw Error("Gemini API key is required");let s=new u.q({apiKey:t,temperature:.7,model:"gemini-2.5-pro"}),a=r&&n?[d(r,n)]:[];if(o){let t=p.ks.fromTemplate(`You are a helpful AI learning assistant for college courses. Answer the following question primarily based on the lecture content provided. 
If the lecture content doesn't contain the information needed to answer the question completely, indicate that you'll need to search for additional information.

Lecture Content:
{lectureContent}

Question: {query}

Important Instructions:
1. Base your answer primarily on the lecture content provided above.
2. If the lecture content contains the information needed, provide a comprehensive answer using that information.
3. If the lecture content is insufficient or doesn't address the question, respond with "SEARCH_NEEDED" and then we'll use web search to supplement.
4. Be friendly, supportive, and educational in your response.

Your response:`),r=(await s.invoke(await t.format({query:e,lectureContent:o}))).content.toString();if(r.includes("SEARCH_NEEDED")&&a.length>0)return await h(s,a,e);return r.replace("SEARCH_NEEDED","").trim()}if(0===a.length){let t=p.ks.fromTemplate(`You are a helpful AI learning assistant for college courses. Answer the following question in a friendly, supportive, and comprehensive way.

Question: {query}

Answer:`);return(await s.invoke(await t.format({query:e}))).content.toString()}return await h(s,a,e)}catch(e){throw console.error("Error generating response:",e),e}}async function m(e){try{let{message:t,lectureContent:r}=await e.json(),n=process.env.GEMINI_API_KEY,o=process.env.GOOGLE_SEARCH_API_KEY,s=process.env.SEARCH_ENGINE_ID;if(!n)return i.NextResponse.json({error:"Gemini API key is not configured"},{status:500});let a=await f(t,n,o,s,r);return i.NextResponse.json({response:a})}catch(e){return console.error("Error in chat API:",e),i.NextResponse.json({error:"Failed to process request"},{status:500})}}let w=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"C:\\Users\\Japne\\Desktop\\smarts\\temp-repo\\Web-Application\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:y,staticGenerationAsyncStorage:g,serverHooks:E}=w,v="/api/chat/route";function A(){return(0,a.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:g})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[276,983,376],()=>r(23437));module.exports=n})();