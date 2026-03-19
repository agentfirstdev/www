```py
import requests

response = requests.get(
  'https://api.agentfirst.dev/search',
  headers={'Authorization': f'Bearer {AGENT_FIRST_TOKEN}'},
  params={
    'terms': 'vintage guitars',
    'country': 'us',
    'subdivision': 'tn',
    'format': 'json'
  }
)
```
