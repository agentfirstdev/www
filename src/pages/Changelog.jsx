import { Box } from '@chakra-ui/react';

import * as ui from '../config/ui';
import changelog from '../markdown/changelog.md?raw';

export default function Changelog() {
  return (
    <Box
      id={ui.changelogId}
      my={ui.xsMargin}
      px={{ base: ui.xsMargin, md: ui.xxlMargin }}
      textAlign='left'
      dangerouslySetInnerHTML={{ __html: ui.renderer.render(changelog) }}
    />
  );
}
