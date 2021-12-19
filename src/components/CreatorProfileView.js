/** @format */

import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { coverphoto, profilephoto, socialIcons } from "../assets/data.js";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import { grid } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import { CButton } from "./../layout/CCButton";
import { Repeat } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare, FaYoutubeSquare, FaWifi } from "react-icons/fa";
import { AiFillTwitterCircle, AiOutlineWifi } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { RiHeartsLine } from "react-icons/ri";
import CircleIcon from "@mui/icons-material/Circle";
import heart from "./../assets/heart.png";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.js";
import { getFullUrl, profileUrl } from "../helpers/Constant.js";

const useStyles = makeStyles((theme) => ({
  container: {
    // display: 'grid',
    // gridTemplateColumns: '1fr',
    // placeContent: 'center',
    // padding: '0px 10px',
  },
  coverPhoto: {
    background: `url(${coverphoto})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "50vh",
    [theme.breakpoints.down("md")]: {
      height: "200px",
    },
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  profilePhoto: {
    position: "absolute",
    bottom: "0px",
    marginBottom: "-28px",
    width: "8rem",
    height: "8rem",
    border: "3px solid #fff",
  },
  accinfo: {
    marginTop: "4vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& h3": {
      marginBottom: 0,
    },
  },
  membershipSec: {
    // display: grid,
    // gridTemplateColumns: 'repeat(3, fr)',
    // boxSizing: 'border-box',
    // gridAutoRows: '20vh',
    padding: "0px 20px",
    marginTop: "20px",
  },
  tierCard: {
    padding: "20px",
    display: "flex",
    rowGap: "20px",
    flexDirection: "column",
    alignItems: "center",
    "& h1,h4": {
      marginBottom: 0,
    },
    "& span": {
      textTransform: "uppercase",
      fontWeight: "400",
    },
  },
  blogtitle: {
    fontSize: "2rem",
    fontWeight: "400 !important",
    textAlign: "center",
    marginBottom: "1rem",
  },

  socialInfo: {
    marginTop: "5vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 0px",
    },
  },
  followers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 20px 0px 30px",
    "& h4": {
      marginBottom: 0,
      marginTop: "8px",
      fontSize: "1.8rem",
      fontWeight: "bold",
      fontFamily: "monospace",
      display: "flex",
      alignSelf: "center",
    },
    "& span": {
      fontSize: "1rem",
      fontWeight: "bold",
      fontFamily: "monospace",
    },
    [theme.breakpoints.only("xs")]: {
      //padding: '0px 25px',
    },
  },
  btnoptions: {
    display: "flex",

    [theme.breakpoints.only("xs")]: {
      marginTop: "8px",
    },

    "& .MuiButton-root": {
      marginRight: "3px",
    },
  },
  popularCommunity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "8vh 35vw 5vh",
    [theme.breakpoints.down("sm")]: {
      padding: "8vh 25vw 5vh",
    },
  },
  flyers: {
    padding: "0px 20px",
  },

  spot: {
    position: "absolute",
    display: "block",
    margin: "auto",
    top: "29vh",
    width: "100%",
    height: 45,
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      top: "33vh",
    },
  },
  BtnContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridAutoRows: "30vh",
    border: "1px solid rgb(229,227,221)",
    padding: 20,

    "&>:nth-child(1)": {
      borderRight: "1px solid rgb(229,227,221)",
      borderBottom: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(2)": {
      borderBottom: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(3)": {
      borderRight: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(4)": {
      //borderTop: '1px solid rgb(229,227,221)',
    },
    position: "relative",
    [theme.breakpoints.down("md")]: {
      gridAutoRows: "34vh",
    },
  },
  BtnTools: {
    display: "grid",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgb(229,227,221)",
    },
    "& .MuiButton-root": {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
    },
  },
  toolIcon: {
    // width: 25,
    //height: 25,
    // backgroundColor: 'rgb(225,240,250)',
    //border: '1px solid rgb(225,240,250)',
    //borderRadius: '9999px',
    //padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      fontSize: "5rem",
      color: "#3498db",
    },
    [theme.breakpoints.down("md")]: {
      "& svg": {
        fontSize: "3rem",
        color: "#3498db",
      },
    },

    // '&:hover': {
    //   cursor: 'pointer',

    //   '& svg': {
    //     color: '#333',
    //     fontSize: '3rem',
    //   },
    // },
  },
  iconText: {
    color: "#333",
    fontSize: "1rem",

    paddingTop: theme.spacing(1),
    display: "flex",
    alignSelf: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.728rem",
      textAlign: "center",
    },
  },
}));

const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  );
});

const CreatorProfileView = ({ user }) => {
  const history = useHistory();
  const classes = useStyles();
  // const { joinPlan } = useAuthContext();
  const [more, setMore] = React.useState(true);
  const showMore = (e) => {
    e.preventDefault();
    setMore(!more);
  };

  //start for share tooltip
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const {
    subscription_plans: plans,
    subscriptions_counts: supportCount,
    content_counts: post_count,

    user_info: { profile_image, cover_photo, bio, profile_url, socials },
  } = user;
  const { name, id: userid } = user.user_info.user;
  //end for share tooltip

  const joinPlanByid = (planid) => {
    history.push(`/join/${profile_url}/checkout/?rid=${planid}`);
  };

  const socialLinkSetup = (link) => {
    let linkdata = "";

    console.log(link);
    const data = socials.filter((i) => i.name === link);
    if (data.length > 0) {
      window.open(data.link, "_blank");
    }
  };

  const moreDetail = (id) => {
    history.push("/creator-edit/");
  };

  console.log(user);

  return (
    <Grid className={classes.container}>
      <div className={classes.info}>
        <div
          className={classes.coverPhoto}
          style={{ background: `url(${getFullUrl(cover_photo)})` }}>
          <Avatar
            className={classes.profilePhoto}
            src={getFullUrl(profile_image)}
            alt="profile"
          />
        </div>
        <Box className={classes.accinfo}>
          <h3>
            {name} ({profile_url})
          </h3>
          <h5>{bio}</h5>
        </Box>
      </div>

      <Grid container>
        <Grid item xs={12} sm={12} md={1}></Grid>
        <Grid item xs={12} sm={12} md={10}>
          <Box className={classes.socialInfo}>
            <Box className={classes.followers}>
              <h4>{supportCount}</h4>
              <span>pantpoethu</span>
            </Box>
            <Box className={classes.btnoptions}>
              <Tooltip
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="copied"
                placement="top">
                <MyComponent>
                  <CButton
                    onClick={() => {
                      navigator.clipboard.writeText(profileUrl(profile_url));
                      handleTooltipOpen();
                      setTimeout(() => {
                        handleTooltipClose();
                      }, "1c000");
                    }}>
                    {" "}
                    Share{" "}
                  </CButton>
                </MyComponent>
              </Tooltip>

              <CButton>Follow</CButton>
              <CButton onClick={() => moreDetail(userid)}>
                <MoreHorizIcon />
              </CButton>
            </Box>
          </Box>
          <Box className={classes.popularCommunity}>
            {socialIcons.map((icon, index) => {
              return (
                <IconButton
                  key={index}
                  onClick={() => socialLinkSetup(icon.name)}>
                  <Avatar src={icon.image} alt={`icons${index}`} />
                </IconButton>
              );
            })}
          </Box>

          {/* starting  four card */}

          <Box className={classes.flyers}>
            <Typography variant="h4" className={classes.blogtitle}>
              Become a pantpoethu to
            </Typography>
            {/* starting choices here */}
            <Box className={classes.BtnContainer}>
              <Box className={classes.BtnTools}>
                <Button onClick={() => history.push("/rsmanager")}>
                  <span className={`${classes.toolIcon}`}>
                    <span style={{ fontSize: "3rem", color: "#3498db" }}>
                      {post_count}
                    </span>
                  </span>
                  <span className={classes.iconText}>
                    Unlock {post_count} exclusive posts
                  </span>
                </Button>
              </Box>
              <Box className={classes.BtnTools}>
                <Button
                  onClick={() =>
                    document.querySelector('[id="membership"]').scrollIntoView()
                  }>
                  <span className={`${classes.toolIcon}`}>
                    <span style={{ fontSize: "3rem", color: "#3498db" }}>
                      <RiHeartsLine />
                    </span>
                  </span>
                  <span className={classes.iconText}>
                    Be a part of community
                  </span>
                </Button>
              </Box>

              <Box className={classes.BtnTools}>
                <Button onClick={() => history.push("/home")}>
                  <span className={`${classes.toolIcon}`}>
                    <span style={{ fontSize: "3rem", color: "#3498db" }}>
                      <FaWifi />
                    </span>
                  </span>
                  <span className={classes.iconText}>
                    Be a part of anywhere
                  </span>
                </Button>
              </Box>

              <Box className={classes.BtnTools}>
                <Button onClick={() => console.log("hello world")}>
                  <span className={`${classes.toolIcon}`}>
                    <span style={{ fontSize: "3rem", color: "#3498db" }}>
                      <BiChat />
                    </span>
                  </span>
                  <span className={classes.iconText}>
                    Connect via private message
                  </span>
                </Button>
              </Box>

              <CircleIcon className={classes.spot} />
            </Box>

            {/* starting choices end */}
          </Box>

          {/* paln stat */}
          {/* membership section */}
          <Box className={classes.membershipSec} id="membership">
            <Typography variant="h4" className={classes.blogtitle}>
              Select a membership level
            </Typography>
            <Grid container spacing={2}>
              {plans.map((item, index) => {
                const { level, description, price } = item;
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <div className={`${classes.tierCard} FaintBox`}>
                      <h4>{level}</h4>
                      <h1>{price}Ks</h1>
                      <span>per month</span>

                      <CButton fullWidth onClick={() => joinPlanByid(item.id)}>
                        Join
                      </CButton>
                      <div
                        style={{
                          fontWeight: "bold",
                          //backgroundColor: "rgb(245, 244, 242)",
                          textAlign: "center",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: `${description}`,
                        }}></div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default CreatorProfileView;
