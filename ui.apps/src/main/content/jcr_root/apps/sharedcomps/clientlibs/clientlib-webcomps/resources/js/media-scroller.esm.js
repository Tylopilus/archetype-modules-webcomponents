import { p as promiseResolve, b as bootstrapLazy } from './p-506c8de4.js';

/*
 Stencil Client Patch Browser v2.5.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["p-6446e5b4",[[1,"my-input",{"text":[32]}],[1,"my-tictactoe",{"board":[32]}],[1,"shared-button",{"name":[1]}]]],["p-e0a14a00",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["p-f02d2739",[[4,"shared-image",null,[[0,"sharedEvent","sharedEventHandler"]]]]],["p-2b6dbca9",[[1,"shared-item",{"item":[8]}]]],["p-3c7a623b",[[0,"shared-modal"]]],["p-7a1f3ea0",[[1,"teaser-comp",{"text":[1]}]]]], options);
});
