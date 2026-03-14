```js
fetch('https://api.agentfirst.dev/browser?url=https://example.com/', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.text())
  .then(console.log);
```
