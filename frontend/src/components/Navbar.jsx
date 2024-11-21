import { Box, Container, Typography, Stack, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineAddAPhoto,
  MdLightMode,
  MdOutlineNightlightRound,
} from "react-icons/md";

const Navbar = () => {
  return (
    <Container className="max-h-1140px p-4 mx-t">
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "center",
            sm: "center",
          },
          py: 2,
          width: "100%",
          overflow: "hidden", // Prevent text overflow
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              sm: "flex-start",
            },
            width: {
              xs: "100%",
              sm: "auto",
            },
            maxWidth: "100%", // Ensure full width containment
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, indigo, purple, black)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.15rem",
              fontSize: {
                xs: "1.75rem", // Slightly reduced for mobile
                sm: "2.25rem",
                md: "2.5rem",
                lg: "3rem",
                xl: "3rem",
              },
              textAlign: {
                xs: "center",
                sm: "left",
              },
              width: "100%",
              wordWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Vaulted Frames
            </Link>
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "black",
              fontStyle: "italic",
              fontSize: {
                xs: "0.825rem",
                sm: "0.9rem",
                md: "1rem",
              },
              textAlign: {
                xs: "center",
                sm: "left",
              },
              mt: 1,
              width: "100%",
              wordWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Elevate your memories with timeless designs.
          </Typography>
        </Box>

        {/* Placeholder for additional nav items */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: { xs: 2, sm: 0 },
          }}
        >
          {/* Your additional nav items will go here */}
        </Box>

        <Stack
          direction="row" // This makes it horizontal
          spacing={2} // Adds space between items
          alignItems="center"
          // Vertical alignment
        >
          <Link
            to="/create"
            className="text-2xl sm:1xl md:text-4xl lg:text-5xl"
          >
            <Button>
              <MdOutlineAddAPhoto className="h-14 w-14 text-purple-700" />
            </Button>
          </Link>
          {/* <Button onClick={}>

          </Button> */}
        </Stack>
      </Box>
    </Container>
  );
};

export default Navbar;
