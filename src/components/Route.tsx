import { Box, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { colors } from "../consts/colors";
import { OneRoute, RouteIconType } from "../consts/routeNames";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

interface RouteTextOpacity {
  isActive: boolean;
}

interface Props {
  route: OneRoute;
  index: number;
  isActive: boolean;
  activeRoute: number;
}

const Route = (props: Props) => {
  const { route, index, activeRoute, isActive } = props;
  const { t } = useTranslation();
  const classes = useClasses({ isActive });
  const history = useHistory();

  const handleClick = React.useCallback(() => {
    if (index !== activeRoute) {
      history.push(route.path);
    }
  }, [history, activeRoute, route, index]);

  const RouteIcon = React.useMemo(() => {
    if (props.route.iconType === RouteIconType.Favorites) {
      return <StarOutlineRoundedIcon fontSize="large" color="secondary" />;
    }
    if (props.route.iconType === RouteIconType.MostTraded) {
      return <FavoriteBorderOutlinedIcon fontSize="large" color="secondary" />;
    }
    if (props.route.iconType === RouteIconType.UserStocks) {
      return <HomeOutlinedIcon fontSize="large" color="secondary" />;
    }
  }, [props.route]);

  return (
    <Box component="div" className={classes.mainContainer}>
      {RouteIcon}
      <ListItemText
        primary={t(props.route.name)}
        className={classes.routeText}
        disableTypography
        onClick={handleClick}
      />
    </Box>
  );
};

const useClasses = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  routeText: (props: RouteTextOpacity) => ({
    textDecoration: props.isActive ? "underline" : "none",
    cursor: "pointer",
    paddingLeft: 12,
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.5,
    color: colors.white,
  }),
});

export default Route;
