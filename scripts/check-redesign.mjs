import { build } from "esbuild";
import { writeFile, unlink } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const output = resolve(".redesign-check.mjs");
const code = `
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './src/components/Header';
import { HomePage } from './src/pages/HomePage';
import { MenuPage } from './src/pages/MenuPage';
import { menuItems } from './src/data/menu';
const render=(component,path='/engels-ivanovo/')=>renderToStaticMarkup(React.createElement(MemoryRouter,{basename:'/engels-ivanovo',initialEntries:[path]},component));
const header=render(React.createElement(Header,{onMenuOpen(){},menuOpen:false}));
assert(header.includes('href="/engels-ivanovo/menu"'));
assert(header.includes('href="/engels-ivanovo#food"') || header.includes('href="/engels-ivanovo/#food"'));
const home=render(React.createElement(HomePage));
assert.equal((home.match(/<section /g)||[]).length,6);
assert(home.includes('Котлета из креветки'));
assert(!home.includes('когда созревает повод'));
assert.equal(menuItems.length,84);
assert.equal(new Set(menuItems.map(i=>i.id)).size,84);
const kitchen=render(React.createElement(MenuPage),'/engels-ivanovo/menu');
assert(kitchen.includes('Английский завтрак'));
assert(!kitchen.includes('Эспрессо доппио'));
const bar=render(React.createElement(MenuPage),'/engels-ivanovo/menu#espresso');
assert(bar.includes('Эспрессо доппио'));
assert(!bar.includes('Английский завтрак'));
if (process.env.ENGELS_QA_DOM) {
 const { JSDOM } = await import(process.env.ENGELS_QA_DOM);
 const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost/'});
 globalThis.window=dom.window; globalThis.document=dom.window.document;
 globalThis.HTMLElement=dom.window.HTMLElement;
 globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 globalThis.requestAnimationFrame=cb=>setTimeout(cb,0);
 globalThis.cancelAnimationFrame=clearTimeout;
 window.matchMedia=()=>({matches:true}); window.scrollTo=()=>{};
 dom.window.HTMLElement.prototype.scrollIntoView=()=>{};
 const {createRoot}=await import('react-dom/client');
 const {act}=React;
 const root=createRoot(document.getElementById('root'));
 await act(async()=>root.render(React.createElement(MemoryRouter,{initialEntries:['/menu']},React.createElement(MenuPage))));
 const drinks=[...document.querySelectorAll('button')].find(b=>b.textContent==='Напитки');
 await act(async()=>drinks.click());
 assert(document.body.textContent.includes('Эспрессо доппио'));
 assert(!document.body.textContent.includes('Английский завтрак'));
 const input=document.querySelector('input');
 const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
 await act(async()=>{setter.call(input,'капучино'); input.dispatchEvent(new window.Event('input',{bubbles:true}));});
 assert.equal(document.querySelectorAll('section li').length,2);
 await act(async()=>{setter.call(input,'несуществующийнапиток'); input.dispatchEvent(new window.Event('input',{bubbles:true}));});
 assert(document.body.textContent.includes('Ничего не нашлось'));
 await act(async()=>[...document.querySelectorAll('button')].find(b=>b.textContent==='Сбросить поиск').click());
 assert(document.querySelectorAll('section li').length>2);
 await act(async()=>root.unmount());
 console.log('PASS: interactive drinks switch, search, empty result and reset.');
}
console.log('PASS: subpath navigation, six homepage sections, featured dishes, 84 unique items, kitchen/bar, direct coffee link.');
`;
try {
  const result = await build({
    stdin: { contents: code, resolveDir: process.cwd(), loader: "tsx" },
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    outfile: output,
    define: { "import.meta.env.BASE_URL": '"/engels-ivanovo/"' },
    write: false,
  });
  await writeFile(output, result.outputFiles[0].text);
  await import(pathToFileURL(output).href);
} finally {
  await unlink(output).catch(() => {});
}
