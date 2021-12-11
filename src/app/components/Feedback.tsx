import React from 'react';
import { Box } from '@material-ui/core';

export default function Feedback() {
  return (
    <Box width={640} height={771}>
      <iframe
        title="feedback form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSceQ0pUfWEMIsKA7wKPsFH6r6U5NuLpkbiIppIRxjmHrwgoiA/viewform?embedded=true"
        width="640"
        height="771"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
    </Box>
  );
}
