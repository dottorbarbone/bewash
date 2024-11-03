import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function ContabilityAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Looks good! There's not movements in your account
    </Alert>
  );
}