import { Box } from '@chakra-ui/react';
import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';
import footnotes from 'markdown-it-footnote';

import * as ui from '../config/ui';
import changelog from '../markdown/changelog.md?raw';

const renderer = markdown({ html: true, linkify: true, typographer: true })
  .use(highlights)
  .use(footnotes);

export default function Changelog() {
  return (
    <Box
      id={ui.changelogId}
      my={ui.xsMargin}
      px={{ base: ui.xsMargin, md: ui.xxlMargin }}
      textAlign='left'
      dangerouslySetInnerHTML={{ __html: renderer.render(changelog) }}
    />
  );
}
