/** @format */

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BaseUrl, getFullUrl } from "../helpers/Constant";
import { Avatar, Divider, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const styles = {
  root: {
    marginLeft: 5,
  },
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(5),
  color: "#000",
  backgroundColor: "#f5f4f2",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  zIndex: "1",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: "#333",
    // padding: theme.spacing(1, 1, 1, 0),
    padding: "12px 50px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      color: "#000",
      width: "auto",
      "&:focus": {
        width: "auto",
      },
    },
  },
}));

const SpinnerAdornment = withStyles(styles)((props) => (
  <CircularProgress className={props.classes.spinner} size={20} />
));

const SearchResult = styled("div")(({ theme }) => ({
  position: "static",
  height: "auto",
  width: "200px",
  backgroundColor: "#fff",
  color: "#333",

  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    position: "static",
    zIndex: "1000",
    width: "500px",
  },
  [theme.breakpoints.only("xs")]: {
    position: "static",
    zIndex: "1000",
    width: "200px",
  },
}));

const BoxItem = styled("div")(({ theme }) => ({
  display: "flex",
  boxSizing: "border-box",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignContent: "center",
  padding: "10px 10px",
  columnGap: "10px",
  "&:hover": {
    backgroundColor: "#edebeb",
    borderRadius: "5px",
  },
  [theme.breakpoints.up("xs")]: {
    justifyContent: "flex-start",
  },
  [theme.breakpoints.only("xs")]: {
    justifyContent: "flex-start",
  },
}));

const SearchInput = (props) => {
  const { ...others } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [keyword, setKeyword] = React.useState("");
  const [setData, setIsSetData] = React.useState(true);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.target.value.length);
    if (event.target.value.length >= 3) {
      setOpen((previousOpen) => true);
    } else {
      setOpen((previousOpen) => false);
    }
    setKeyword(event.target.value);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const getData = async (keyword) => {
    let cancel;
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    setIsSetData(true);
    try {
      await axios
        .get(
          `${BaseUrl}/user/search`,
          {
            params: {
              s: keyword,
              status: "",
            },
          },
          { cancelToken: cancel.token }
        )
        .then((res) => {
          setResult([]);
          if (res.data.data.length > 0) {
            setResult(res.data.data);
          }
          setIsSetData(false);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    setIsSetData(true);

    async function anyNameFunction() {
      if (keyword != "") {
        await getData(keyword);
      }
    }
    anyNameFunction();
  }, [keyword]);

  return (
    <React.Fragment>
      <Search>
        <SearchIconWrapper>
          {!setData ? <SpinnerAdornment /> : <SearchIcon />}
        </SearchIconWrapper>
        <StyledInputBase
          aria-describedby={id}
          placeholder="Search a creator..."
          value={keyword}
          inputProps={{ "aria-label": "search" }}
          onChange={handleClick}
        />
        <Popper
          style={{ zIndex: 1900 }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal>
          <SearchResult padding={2}>
            {result.map((item, index) => {
              return (
                <Link
                  to={`/creator-profile/${item.user_info.profile_url}`}
                  onClick={() => {
                    setResult([]);
                    setOpen(false);
                    setKeyword("");
                  }}
                  key={index}
                  style={{ textDecoration: "none", color: "#333" }}>
                  <BoxItem>
                    <Avatar
                      src={getFullUrl(item.user_info.profile_image)}
                      alt={item.user_info.user.name}
                    />
                    <div>
                      <h5 style={{ margin: "0px" }}>
                        {item.user_info.user.name}({item.user_info.profile_url})
                      </h5>
                      <span style={{ fontSize: "0.825rem" }}>
                        {item.user_info.bio}
                      </span>
                    </div>
                  </BoxItem>
                </Link>
              );
            })}
          </SearchResult>
        </Popper>
      </Search>
    </React.Fragment>
  );
};

export default SearchInput;
