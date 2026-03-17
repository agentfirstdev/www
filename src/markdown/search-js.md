```js
fetch('https://api.agentfirst.dev/search?terms=foo+bar+baz&format=json', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.json())
  .then(console.log);
```
