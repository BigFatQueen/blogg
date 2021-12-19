/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthContext, useGlobalContext } from "./../../context/AuthContext";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Avatar, Typography, Divider } from "@mui/material";
import { CustomButton } from "../../layout/CutomerButton";
import TabContents from "../../components/TabContent";
import { getFullUrl } from "../../helpers/Constant";

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },

    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  wrapper: {
    // minHeight: "100vh",
    display: "grid",

    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "1200px",
    textAlign: "center",
    height: "auto",
    [theme.breakpoints.only("xs")]: {},
  },
  card: {
    marginTop: "10px !important",
    boxShadow: "none !important",
    border: "1px solid rgb(229, 227, 221)",
    "& h3": {
      margin: "0px",
    },
  },

  cardcontent: {
    padding: "0px",
  },
  cardLast: {
    marginTop: "8px",
  },
}));
//first user view/ not creator view
const UserHome = () => {
  const { token, user } = useAuthContext();
  const history = useHistory();
  const classes = useStyle();
  const theme = useTheme();
  const islaptop = useMediaQuery(theme.breakpoints.down("md"));
  const goToEdit = () => {
    if (user.role === "creator") {
      history.push("/edit");
    } else {
      history.push("/step/1");
    }
  };

  //   React.useEffect(() => {
  //    let getdata=true;
  //    if(getdata){
  //      getPosts();
  //    }
  //    return () => {
  //      getdata=false;
  //    }
  //  }, [])

  //
  return (
    <div className={classes.wrapper}>
      <section className={classes.container}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            display={{ xs: "block", sm: "block" }}
            order={{ xs: 1, sm: 2 }}>
            <TabContents />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            order={{ xs: 2, sm: 1 }}
            display={{ xs: "none", sm: "block" }}>
            {/* supporting */}

            <Card className={classes.card}>
              <CardContent className={classes.cardcontent}>
                <Grid
                  p={2}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={getFullUrl(user.profile_image)}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography variant="subtitle1" mt={2} component="div">
                    {user.name}
                  </Typography>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <h3 m={0}>Supporting</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <span m={0}>You aren’t supporting any creators yet.</span>
                </Grid>
              </CardContent>
            </Card>

            <Box display={{ xs: "none", sm: "block", md: "none" }}>
              <Card className="card card-last ">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h3 m={0}>Supporting</h3>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      You're almost there! Complete your page and take it live.
                    </p>
                    <CustomButton onClick={goToEdit}>
                      {user.role === "creator"
                        ? "Finish my page"
                        : "Become a creator"}
                    </CustomButton>
                  </Grid>
                </CardContent>
              </Card>

              <Card className="card card-last">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h3 m={0}>FIND CREATORS YOU LOVE</h3>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      The creators you already love may be on Patreon – connect
                      your social media to find them.
                    </p>
                    <CustomButton>Find creators</CustomButton>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            order={{ xs: 2, sm: 3 }}
            display={{ xs: "flex", sm: "none", md: "flex" }}
            flexDirection="column">
            {/* find creator */}

            <Card className={classes.card}>
              <CardContent className={classes.cardcontent}>
                <Grid p={2}>
                  <h3 m={0}>Supporting</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <p m={0} mb={2}>
                    You're almost there! Complete your page and take it live.
                  </p>
                  <CustomButton onClick={goToEdit}>Finish my page</CustomButton>
                </Grid>
              </CardContent>
            </Card>

            <Card className={`${classes.card} ${classes.cardLast}`}>
              <CardContent className={classes.cardcontent}>
                <Grid p={2}>
                  <h3 m={0}>FIND CREATORS YOU LOVE</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <p m={0} mb={2}>
                    The creators you already love may be on Patreon – connect
                    your social media to find them.
                  </p>
                  <CustomButton>Find creators</CustomButton>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

const Wrapper = styled.section`
  margin: 20px 0px;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 1200px;
    height: auto;

    display: flex;
  }

  .card {
    box-shadow: none !important;
    border: 1px solid rgb(229, 227, 221);
  }

  .cardcontent {
    padding: 0px;
  }
  .card h3 {
    margin: 0px;
  }

  .card-last {
    margin-top: 8px;
  }
`;

export default UserHome;
