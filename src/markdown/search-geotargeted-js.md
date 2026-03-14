```js
fetch('https://api.agentfirst.dev/search?terms=foo+bar+baz&country=us&subdivision=tn&format=json', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.json())
  .then(console.log);
```
