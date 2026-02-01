```js
const response = await fetch(
  'https://api.agentfirst.dev/search?terms=foo+bar+baz',
  { headers: { Authorization: `Bearer ${agentFirstToken}` } }
);
```
