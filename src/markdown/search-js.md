```js
const response = await fetch(
  'https://api.agentfirst.dev/search?terms=foo+bar+baz&format=json',
  { headers: { Authorization: `Bearer ${agentFirstToken}` } }
);
```
