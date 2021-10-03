import { Copyright } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import "../../styles/footer/Footer.scss";

const Footer: FunctionComponent = () => {
    return (
        <>
        <Box className="footer" component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          All rights reserved. Copyright
          <Copyright className="copyWriteIcon" />
          2021
        </Typography>
        </Box>
        </>
    );
};

Footer.propTypes = {};

export default Footer;