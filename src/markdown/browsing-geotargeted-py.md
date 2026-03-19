```py
import requests

response = requests.get(
  'https://api.agentfirst.dev/browser',
  headers={'Authorization': f'Bearer {AGENT_FIRST_TOKEN}'},
  params={
    'url': 'https://guitars.com/',
    'country': 'us',
    'city': 'Nashville'
  }
)
```
