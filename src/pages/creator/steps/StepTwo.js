import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from '@mui/material'
import { CButton } from './../../../layout/CCButton'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'grid',
    marginTop: '5vh',
    placeItems: 'center',
    padding: '10px',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
      padding: '10px',
    },
    '& h2': {
      textAlign: 'center',
    },
  },
  container: {
    width: '90vw',
    maxWidth: '700px',
    textAlign: 'start',
    height: 'auto',
    padding: '20px',

    [theme.breakpoints.only('xs')]: {
      padding: '5px',
    },
  },
  categories: {
    padding: ' 20px 30px',
  },
  subtitle: {
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '20px',
  },
  cText: {
    display: 'block',
    marginTop: '20px',
  },
  btngroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    '& a': {
      display: 'flex',
      alignSelf: 'center',
    },
  },
  choice: {
    marginTop: '30px',
  },
}))

const StepTwo = () => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Grid container>
          <Grid item sm={12} md={8}>
            <span className={classes.subtitle}>Step 2 of 2</span>
            <Typography variant='h4' component='div' gutterBottom={false}>
              Does your work contain 18+ themes sunch as real or illustrated
              nudity?
            </Typography>
            <span className={classes.cText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              consectetur non. Necessitatibus, ab saepe? Modi dolore officia quo
              impedit est excepturi quia accusamus labore natus reiciendis, quae
              perferendis temporibus provident. quo impedit est excepturi quia
              accusamus labore natus reiciendis, quae perferendis temporibus
              provident.
            </span>
            <FormGroup className={classes.choice}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='No ,my work does not contain real or illustrated nudity.'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='Yes, my work contains real or illustarted nudity'
              />
            </FormGroup>
            <Box className={classes.btngroup}>
              <Link>Back</Link>
              <CButton
                ct='0px'
                onClick={() => {
                  history.push('/Edit')
                }}
              >
                Continue
              </CButton>
            </Box>
          </Grid>
          <Grid item sm={12} md={4}></Grid>
        </Grid>
      </div>
    </div>
  )
}
const Wrapper = styled.section`
  max-height: 100vh;
  margin-top: 10vh;
  display: grid;
  padding: 10px;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 800px;
    text-align: start;
    border: 1px solid rgb(229, 227, 221);
    border-radius: 4px;
    height: auto;
    padding: 20px;
  }
`
export default StepTwo