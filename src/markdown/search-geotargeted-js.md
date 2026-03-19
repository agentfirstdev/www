```js
fetch('https://api.agentfirst.dev/search?terms=vintage+guitars&country=us&subdivision=tn&format=json', {
  headers: { Authorization: `Bearer ${agentFirstToken}` }
})
  .then((response) => response.json())
  .then(console.log);
```
