/** @format */

import * as React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import styles from "./../assets/post.module.css";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AiOutlineDownCircle } from "react-icons/ai";
import { CustomButton } from "./../layout/CutomerButton";
import imgurl from "../assets/images/subscriptions.png";
import {
  Avatar,
  Button,
  Divider,
  formControlClasses,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageGrid from "./../components/Gridview";
import { postPhoto } from "./../assets/data";
import PostDetailModel from "./PostDetailView";
import { usePostContext } from "../context/PostContext";
import { getFullUrl } from "./../helpers/Constant";
import { Audio } from "./Audio";
import LinkPreview from "./LinkPreview";
import { useAuthContext } from "../context/AuthContext";
import CommentBox from "./CommentBox";
import { BaseUrl } from "./../helpers/Constant";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { bgcolor } from "@mui/system";
import PostDetailView from "./../components/PostDetailView";
import moment from "moment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    position: "absolute",
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiBox-root": {
      padding: 0,
      paddingTop: theme.spacing(1),
    },
  },
  creatorMenu: {
    position: "relative",
    padding: "2px",
    border: "1px solid rgb(229, 227, 221)",
    marginBottom: theme.spacing(1),
    color: "rgb(229, 227, 221)",
    backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc)`,
    backgroundPosition: `
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 9em`,
    backgroundSize: `
    5px 5px,
    5px 5px,
    1px 1.5em`,
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  creatorMenuTab: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  allposts: {
    backgroundPosition: "center 120px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    minHeight: "500px",
    border: "1px solid rgb(229, 227, 221)",
    borderRadius: "4px",
    textAlign: "center",
    padding: "0px !important",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "300px",
    },
  },
  postCard: {
    padding: "20px",
  },
  accInfo: {
    display: "flex",
    justifyContent: "start",
    "& .MuiAvatar-root": {
      width: "50px",
      height: "50px",
    },
    "& h3": {
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      marginLeft: "16px",
      fontSize: "1.2rem",
    },
  },
  postInfo: {
    textAlign: "start",
    marginTop: "20px",
  },
  uploadFile: {
    margin: "8px 0px",
    padding: 0,
  },
  btnOptions: {
    display: "flex",
    justifyContent: "space-between",
    color: "#706c64",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },

    "& p": {
      display: "flex",
      alignSelf: "center",
    },
  },
  postDetail: {
    position: "relative",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  shade: {
    position: "absolute",
    bottom: 0,
    height: "5rem",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
  },
  postContent: {
    height: "80px",
    overflow: "hidden",
  },
  // comment start
  commentSection: {
    padding: "20px !important",
  },
  commentInfo: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "#333",
    },
  },
  MainComment: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3px",
    marginBottom: "1.3rem",
  },
  content: {
    display: "flex",
    justifyContent: "start",
    gap: "16px",
    flexGrow: 1,
  },
  commentDetail: {
    textAlign: "start",

    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
    "& p": {
      fontSize: "0.978rem",
    },
    "& .MuiButtonBase-root": {
      padding: "10px 10px",
    },
  },
  commentSection: {
    padding: "10px",
    textAlign: "start",
    flexGrow: "1",
    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
  },
  reply: {
    marginLeft: "3.75rem",
    display: "flex",
    justifyContent: "space-between",
  },
  replyInfo: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    gap: "10px",
  },
  replyDetail: {
    flexGrow: 1,
    textAlign: "start",
    "& h4": {
      marginBottom: "10px",
    },
  },
  count: {
    display: "flex",
    alignSelf: "flex-end",
    fontSize: "1rem",
    color: "#000",
  },
  hideReply: {
    display: "none",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

//1 for all, 2 for public and 3 all creator

const BasicTabs = (props) => {
  // const {posts}=props;
  // console.log(posts);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPost] = React.useState([]);
  const { user: authUser, token } = useAuthContext();
  const [changes, setChange] = React.useState(false);
  const [value, setValue] = React.useState(0);
  // const [postid, setPostid] = React.useState("");
  const changeData = () => {
    setChange(!changes);
  };

  //console.log(posts);
  const history = useHistory();
  const classes = useStyles();
  const [firstView, setFirstView] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    settype(newValue + 1);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [type, settype] = React.useState(1);

  // React.useEffect(() => {
  //   var controller = new AbortController();
  //   // getPosts();
  //   console.log("i am working");
  //   async function anyNameFunction() {
  //     const apiposts = await getPosts(1);
  //     setItem(apiposts);
  //     console.log(items);
  //   }
  //   anyNameFunction();
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios({
        method: "get",
        url: `${BaseUrl}/content`,
        params: {
          type: 1,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(res.data.data);
      setLoading(false);
    };
    getData();
  }, [changes]);

  //  React.useEffect(() => {
  //    setIsSetData(true);

  //    async function anyNameFunction() {
  //      if (keyword != "") {
  //        await getData(keyword);
  //      }
  //    }
  //    anyNameFunction();
  //  }, [keyword]);

  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example">
          <Tab label="All posts" {...a11yProps(0)} />
          <Tab label="Pantpoe only posts" {...a11yProps(1)} />
          <Tab
            label="Show all creators "
            icon={
              <AiOutlineDownCircle fontSize={"large"} onClick={handleClick} />
            }
            iconPosition="end"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      <TabPanel posts={posts} value={value} index={0} className={classes.root}>
        {firstView && (
          <div
            className={`${classes.allposts}`}
            style={{ backgroundImage: `url(${imgurl})` }}>
            <p>
              <strong> Support</strong> or <strong> Follow</strong> creators to
              see posts in your feed
            </p>
            <CustomButton>Find your creator</CustomButton>
          </div>
        )}

        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === type)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.root}>
        {/* <div className={`${classes.allposts}`}>
          <p>
            <strong> Support</strong> or <strong> Follow</strong> creators to
            see posts in your feed
          </p>
          <CustomButton>Find your creator</CustomButton>
        </div> */}
        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === type)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.creatorMenuTab}>
        {posts.length <= 0 && (
          <div className={`${classes.allposts}`}>
            <p>
              <strong> Support</strong> or <strong> Follow</strong> creators to
              see posts in your feed
            </p>
            <CustomButton>Find your creator</CustomButton>
          </div>
        )}
        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === type)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
          <MenuItem onClick={handleClose} disableRipple>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Duplicate
          </MenuItem>

          <MenuItem onClick={handleClose} disableRipple>
            Archive
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            More
          </MenuItem>
        </StyledMenu>
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
