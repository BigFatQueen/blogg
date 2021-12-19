/** @format */

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  ButtonGroup,
  Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import JoditEditor from "jodit-react";
import Link from "@mui/material/Link";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import "../../assets/style.css";
import Avatar from "@mui/material/Avatar";
import { FiEdit3 } from "react-icons/fi";
import { makeStyles } from "@mui/styles";
import { CButton } from "../../layout/CCButton";
import { coverphoto } from "../../assets/data";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import SelectOption from "./../../layout/SelectOption";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  BaseUrl,
  getFullUrl,
  RBaseUrl,
  changeSocials,
} from "../../helpers/Constant";
import moment from "moment";
import Editor from "../../components/Editor";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    marginTop: "5vh",
    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "700px",
    textAlign: "center",
    height: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  boxer: {
    display: "flex",
    padding: "20px 25px",
    justifyContent: "flex-start",
    justifyItems: "center",
    alignItems: "baseline",
    "& .MuiAvatar-root": {
      display: "flex",
      alignSelf: "center",
      marginRight: theme.spacing(2),
    },
    "& h4": {
      display: "flex",
      alignSelf: "center",
      marginRight: theme.spacing(1),
      fontFamily: "Open Sans, sans-serif",
      fontSize: "1.3rem",
    },
    "& svg": {
      color: "rgb(229,227,221)",
      fontSize: "1.3rem",
      alignSelf: "center",
    },
  },
  cusFormInput: {
    textAlign: "start",
    padding: " 10px 0px",

    "& label": {
      color: "#333333",
      padding: "18px 0px",
      marginBottom: "8px",
    },
    "& .inputField": {
      margin: "0.5rem 0px",
      background: "rgb(245, 244, 242)",
    },
  },
  datePickupInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& span": {
      margin: "0px 8px",
    },
    "& .MuiOutlinedInput-root #day,.MuiOutlinedInput-root #month": {
      width: "24px",
    },
    "& .MuiOutlinedInput-root #year": {
      width: "42px",
    },

    [theme.breakpoints.down("md")]: {
      marginTop: "10px",
    },

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      "& ~$mdsize": {
        margin: "0px 8px",
        display: "none",
      },
      "& .MuiOutlinedInput-root #day,.MuiOutlinedInput-root #month": {
        width: "100%",
      },
      "& .MuiOutlinedInput-root #year": {
        width: "100%",
      },
    },
  },
  xssize: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      alignSelf: "self-start",
    },
  },
  mdsize: {
    display: "inline",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  subtitle: {
    fontSize: "0.725rem",
    color: "#c9c8c4",
  },
  buttonGroup: {
    float: "right",
  },
  selectOption: {
    margin: "0px 8px!important",
  },
  cusFormControl: {
    "& .MuiFormControl-root ": {
      margin: "0px 0px 0px 0px !important",
    },
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cusOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverphoto: {
    marginTop: "16px",
    height: "250px",
    width: "100%",
    backgroundImage: `url(${coverphoto})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  hrdiv: {
    margin: "20px 0px !important",
  },
  general: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    gap: "15px",
  },
  logodiv: {
    marginLeft: "-66px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "-66px",
    },
  },
}));

// input formula=> (valu.length + 1)*8

const EditProfile = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const classes = useStyles();
  const editor = useRef(null);
  const profile = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    loading: true,
    day: "",
    month: "",
    year: "",
    socials: [],
  });

  const socialArray = [
    "facebook",
    "instagram",
    "youtube",
    "twitter",
    "twitch",
    "discord",
    "tiktok",
    "others",
  ];

  const places = ["yangon", "mandalay", "sagaing"];

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const getData = () => {
    axios
      .get(`${BaseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const response = res.data.data;
        console.log(res);
        setData((prev) => ({
          ...prev,
          loading: false,
          day:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("date"),
          month:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("month"),
          year:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("year"),
          socials: changeSocials(response.user_info.socials),
          ...response,
        }));
      })
      .catch((err) => {
        console.log(err.message);
        // setIsSetData(false);
        // setError(err.message);
      });
  };

  React.useEffect(() => {
    const controller = new AbortController();

    async function anyfunction() {
      await getData();
    }
    anyfunction();
    return () => {
      controller.abort();
    };
  }, [id]);

  if (data.loading) {
    return <h3>loading....</h3>;
  }

  const removeLink = (i) => {
    const { socials } = data;
    let newSocials = socials.filter((data, index) => index !== i);
    setData((prev) => ({
      ...prev,
      socials: newSocials,
    }));
  };

  const inputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(value);
    const { user_info } = data;
    if (name === "newcover" || name === "newprofile") {
      if (name === "newprofile") {
        user_info.profile_image = files[0];
      } else {
        user_info.cover_photo = files[0];
      }
      setData((prev) => ({
        ...prev,
        user_info,
      }));
    } else {
      console.log("helo world");
      // setState((prev) => ({
      //   ...prev,
      //   [name]: value,
      // }));
    }
  };
  const updateData = () => {
    console.log("helow rod");
  };

  const NewgetValue = (value) => {
    console.log(value);
    // setState({ ...state, isError })
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography variant="h4" gutterBottom component="div">
          Edit Profile
        </Typography>

        {/* <Box className={`${classes.boxer}  `}>
          <Avatar src='https://cdn-icons-png.flaticon.com/128/1946/1946429.png' />
          <h4>Username</h4>
          <FiEdit3 />
        </Box> */}

        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> profile photo </h5>
            <Button onClick={() => profile.current.click()}>Edit</Button>
            <input
              style={{ display: "none" }}
              type="file"
              ref={profile}
              onChange={inputChange}
              name="newprofile"
              accept="image/*"
              className={classes.hidddendiv}
            />
          </Box>
          <Box className={classes.profilephoto} style={{ alignSelf: "center" }}>
            {console.log(typeof data.user_info.profile_image)}
            <Avatar
              sx={{ width: "80px", height: "80px" }}
              src={getFullUrl(data.user_info.profile_image)}
            />
          </Box>
        </Box>

        <Divider className={classes.hrdiv} />

        {/* cover start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Cover photo </h5>
            <Button>Edit</Button>
          </Box>
          <Box
            className={classes.coverphoto}
            style={{
              backgroundImage: `url('${getFullUrl(
                data.user_info.cover_photo
              )}')`,
            }}></Box>
        </Box>

        <Divider className={classes.hrdiv} />
        {/* bio start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Bio </h5>
            <Button>Edit</Button>
          </Box>

          <TextField
            id="filled-multiline-flexible"
            inputProps={{ "aria-label": "Without label" }}
            multiline
            fullWidth
            defaultValue={data.user_info.bio}
            maxRows={4}
            onChange={() => console.log("helow")}
            variant="standard"
          />
        </Box>
        <Divider className={classes.hrdiv} />
        {/* dob and gender  */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> General Info </h5>
            <Button>Edit</Button>
          </Box>
          <Box className={classes.general}>
            <Box className={classes.cusFormControl}>
              <Box className={classes.cusOptions}>
                <h5 className="input-label"> Gender </h5>
              </Box>
              <Box className={classes.datePickupInput}>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group">
                  <Button
                    //onClick={() => genderChange("male")}
                    style={{
                      backgroundColor: `${
                        data.user_info.gender === "male" ? "#333" : ""
                      }`,
                    }}>
                    <MaleIcon />
                  </Button>
                  <Button
                    //onClick={() => genderChange("female")}
                    style={{
                      backgroundColor: `${
                        data.user_info.gender === "female" ? "#333" : ""
                      }`,
                    }}>
                    <FemaleIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box className={classes.cusFormControl}>
              <Box className={classes.cusOptions}>
                <h5 className="input-label"> Birthday </h5>
              </Box>
              <Box className={classes.datePickupInput}>
                <span className={classes.xssize}>Day</span>
                <TextField
                  id="day"
                  type="text"
                  value={data.day}
                  // name={aemail}
                  name="day"
                  className={classes.inputField}
                  placeholder="XX"

                  // onChange={(e) => setEmail(e.target.value)}
                />
                <span className={classes.mdsize}>Day</span>
                <span className={classes.xssize}>Month</span>
                <TextField
                  variant="outlined"
                  type="text"
                  id="month"
                  value={data.month}
                  name="month"
                  placeholder="XX"
                />
                <span className={classes.mdsize}>Month</span>
                <span className={classes.xssize}>Year</span>
                <TextField
                  variant="outlined"
                  type="text"
                  name="year"
                  value={data.year}
                  id="year"
                  placeholder="XXXX"
                />
                <span className={classes.mdsize}>Year</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider className={classes.hrdiv} />
        {/* link start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Links </h5>
            <Button>Edit</Button>
          </Box>
          <SelectOption fullWidth={true} data={socialArray} />
          <TextField
            id="standard-basic"
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            variant="standard"
            placeholder="https://www.example.com/..."
          />
          <List>
            {data.socials.map((acc, index) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeLink(index)}>
                      <RemoveCircleOutlineSharpIcon />
                    </IconButton>
                  }>
                  <ListItemText primary={acc[1]} secondary={acc[0]} />
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider className={classes.hrdiv} />

        {/* email start 
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Email </h5>
            <Button>Add</Button>
          </Box>

          <TextField
            id='standard-basic'
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
            variant='standard'
            placeholder='example@gmail.com'
          />
        </Box>
        <Divider className={classes.hrdiv} />
         phone start 
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Phone </h5>
            <Button>Add</Button> 
          </Box>

          <OutlinedInput
            fullWidth
            id='loginPh'
            // value={phone}
            // onChange={handlePhoneNumber}
            startAdornment={
              <InputAdornment position='start'>
                +95
                <KeyboardArrowRightIcon /> 9
              </InputAdornment>
            }
            aria-describedby='component-error-text'
            inputProps={{ type: 'number', 'aria-label': 'Without label' }}
            placeholder='000000000'
          />
        </Box>
        <Divider className={classes.hrdiv} /> */}

        {/* region start */}
        {/* <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Regions </h5>
            <Button>Edit</Button>
          </Box>
          <SelectOption fullWidth={false} data={places} />
        </Box>
        <Divider className={classes.hrdiv} /> */}
        {/* region start */}
        {/* <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Address </h5>
            <Button>Edit</Button>
          </Box>
          <TextField
            id='filled-multiline-flexible'
            label='example street or quater,example township, example city'
            displayempty
            inputProps={{ 'aria-label': 'Without label' }}
            multiline
            fullWidth
            maxRows={4}
            onChange={() => console.log('helow')}
            variant='standard'
          />
        </Box> */}
        {/* button start */}
        {/* <Box className={classes.buttonGroup} sx={{ mt: 3 }}>
          <CButton bgcolor='#eeeeee' textcolor='#0f0f0f'>
            Cancel
          </CButton>
          <CButton>Save</CButton>
        </Box> */}

        {/* starting tier */}
        {data.subscription_plans.map((item) => {
          return (
            <Box className={classes.cusFormControl}>
              <Box className={classes.cusOptions}>
                <h5 className="input-label"> Tiers </h5>
                <Button>Edit</Button>
              </Box>
              {/* name  */}
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Tier Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={item.level}
                    inputProps={{ "aria-label": "Without label" }}
                    placeholder="sample"
                  />
                </Grid>
              </Grid>
              {/* logo  */}
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Tier Logo
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.logodiv}>
                  <img
                    src={`${getFullUrl(item.image)}`}
                    alt="name"
                    loading="lazy"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      marginLeft: "20px",
                    }}
                  />
                </Grid>
              </Grid>
              {/* price */}
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Tier price
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={item.price}
                    inputProps={{ "aria-label": "Without label" }}
                    placeholder="0,000,000"
                  />
                </Grid>
              </Grid>

              {/* desc  */}
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Editor
                    contents={item.description}
                    getValue={NewgetValue}></Editor>
                </Grid>
              </Grid>

              {/* benefit  */}
              <Grid container display={"none"}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Benefit
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                    placeholder="text"
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}

        <Divider className={classes.hrdiv} />
      </div>
    </div>
  );
};

export default EditProfile;
