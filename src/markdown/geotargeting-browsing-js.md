```js
const response = await fetch(
  'https://api.agentfirst.dev/browser' +
    '?url=https://example.com/&country=us&city=nashville',
  { headers: { Authorization: `Bearer ${agentFirstToken}` } }
);
```
