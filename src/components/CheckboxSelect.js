import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function BasicSelect({ categories }) {
  const [category, setCategory] = React.useState('')

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120, marginTop: '16px' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Required</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label='Required'
          onChange={handleChange}
        >
          <MenuItem value={0}>Choose One!</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
