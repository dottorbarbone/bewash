import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function InputNote() {
  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(28);
  return (
    <center>
  <Box sx={{ display: 'flex',marginTop:'25px', flexDirection: 'column', gap: 2, width:"68%" }}>
      <Input
        sx={{borderRadius:'5px'}}
        size="md"
        placeholder="notes..."
        endDecorator={
          <Button variant="soft" size="md" sx={{borderRadius:'5px'}}>
            Update
          </Button>
        }
      />

    </Box>
    </center>
    
  );
}
