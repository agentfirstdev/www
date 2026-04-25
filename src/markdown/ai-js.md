```js
fetch('https://api.agentfirst.dev/ai?prompt=best+basketball+shoes+for+2026', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.json())
  .then(console.log);
```
