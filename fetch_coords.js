const https = require('https');

const links = [
  "https://maps.app.goo.gl/VuwRehUBDeJUfMS59",
  "https://maps.app.goo.gl/3jw5Zjk11caTP2fM8",
  "https://maps.app.goo.gl/aLU1jdbFuYGRnjsi9",
  "https://maps.app.goo.gl/vdPEnRMvK67JaeDCA",
  "https://maps.app.goo.gl/Td7zfySRDwzbmin77",
  "https://maps.app.goo.gl/gQgHfW3P8hAV4dfX9",
  "https://maps.app.goo.gl/aeDdYczaFm6cZUHY7",
  "https://maps.app.goo.gl/bD2932B1Fm7i8ALy8",
  "https://maps.app.goo.gl/F5DubFCfuwVkrcyi9",
  "https://maps.app.goo.gl/NEgfpaa9JGTXAajt5",
  "https://maps.app.goo.gl/kfc1bfCQpaWfwHfy5",
  "https://maps.app.goo.gl/fbqFiqANPeika1z77",
  "https://maps.app.goo.gl/uJLmpBs47ha9cLir9",
  "https://maps.app.goo.gl/4Y24m5u1CpaMHKV76",
  "https://maps.app.goo.gl/CwCc4MjfyussAHhAi9",
  "https://maps.app.goo.gl/JuWPi3w3iQJwgXAh9",
  "https://maps.app.goo.gl/VafzoX3zULox183u8",
  "https://maps.app.goo.gl/Cr5ck22CGL3KaAFVA"
];

const getRedirect = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.headers.location);
    }).on('error', () => resolve(null));
  });
};

async function run() {
  for (let i = 0; i < links.length; i++) {
    const loc = await getRedirect(links[i]);
    console.log(`${i}: ${loc}`);
  }
}
run();
