```js
fetch('https://api.agentfirst.dev/browser?url=https://guitars.com/&country=us&city=Nashville', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.text())
  .then(console.log);
```
