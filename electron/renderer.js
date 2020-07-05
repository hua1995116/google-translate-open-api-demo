// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const translate = require('google-translate-open-api').default;

(async () => { 
    const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
        tld: "cn",
        to: "zh-CN",
        isUserAgent: false
    });
      
    const data = result.data[0];
    console.log(data);
})()

