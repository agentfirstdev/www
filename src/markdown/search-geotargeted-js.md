```js
const response = await fetch(
  'https://api.agentfirst.dev/search' +
    '?terms=foo+bar+baz&country=us&subdivision=tn',
  { headers: { Authorization: `Bearer ${agentFirstToken}` } }
);
```
