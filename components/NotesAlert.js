import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function NotesAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Looks good! There's not any note
    </Alert>
  );
}