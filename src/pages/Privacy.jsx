import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import * as ui from '../config/ui';

export default function Privacy() {
  useEffect(() => {
    const container = document.getElementById(ui.legalId);
    const script = document.createElement('script');
    script.src = 'https://cdn.iubenda.com/iubenda.js';
    const observer = new MutationObserver(() => {
      container.querySelectorAll('p br').forEach((br) => {
        const spacer = document.createElement('div');
        spacer.style.marginTop = '1em';

        br.replaceWith(spacer);
      });
    });

    observer.observe(container, { childList: true, subtree: true });
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      script.remove();
    };
  }, []);

  return (
    <Box
      id={ui.legalId}
      my={ui.xsMargin}
      px={{ base: ui.xsMargin, md: ui.xxlMargin }}
      textAlign='left'
    >
      <a
        className='iubenda-white no-brand iubenda-noiframe iubenda-embed iub-body-embed'
        title={ui.privacyLabel}
        href='https://www.iubenda.com/privacy-policy/48482776'
      >
        {ui.privacyLabel}
      </a>
    </Box>
  );
}
