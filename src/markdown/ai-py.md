```py
import requests

response = requests.get(
  'https://api.agentfirst.dev/ai',
  headers={'Authorization': f'Bearer {AGENT_FIRST_TOKEN}'},
  params={'prompt': 'foo best basketball shoes for 2026'}
)
```
