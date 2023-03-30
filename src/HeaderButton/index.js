// @flow

import { CircularProgress, colors, Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React from "react"
import { useIconDictionary } from "../icon-dictionary.js"
import { iconMapping } from "../icon-mapping.js"
import { makeStyles } from "@mui/styles"
import { tooltipClasses } from "@mui/material/Tooltip"

const theme = createTheme()
const defaultNameIconMapping = iconMapping

const getIcon = (iconName, customIconMapping) => {
  const Icon =
    customIconMapping[iconName.toLowerCase()] ||
    defaultNameIconMapping[iconName.toLowerCase()] ||
    defaultNameIconMapping.help
  return <Icon />
}

const useStyle = makeStyles((theme) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: 60,
  paddingTop: 8,
  paddingBottom: 4,
  marginLeft: 1,
  marginRight: 1,
}))
const ButtonInnerContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}))
const IconContainer = styled("div")(({ textHidden }) => ({
  color: colors.grey[700],
  height: textHidden ? 32 : 20,
  paddingTop: textHidden ? 8 : 0,
  "& .MuiSvgIcon-root": {
    width: "auto",
    height: 18,
  },
}))
const Text = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 11,
  color: colors.grey[800],
  display: "flex",
  alignItems: "center",
  lineHeight: 1,
  justifyContent: "center",
}))

export const HeaderButton = ({
  name,
  icon,
  disabled,
  onClick,
  hideText = false,
  className,
  iconName,
}) => {
  const customIconMapping = useIconDictionary()
  const classes = useStyle()

  return (
    <ThemeProvider theme={theme}>
      <Tooltip
        arrow
        title={name}
        className={{ tooltip: classes.tooltip }}
        placement="top-start"
      >
        <Button
          onClick={onClick}
          disabled={disabled}
          className={`${className}_btn btn`}
          // startIcon={
          //   disabled === true ? (
          //     <CircularProgress size={"1.5rem"} />
          //   ) : (
          //     icon || getIcon(iconName, customIconMapping)
          //   )
          // }
        >
          {" "}
          {name}
        </Button>
      </Tooltip>
    </ThemeProvider>
  )
}

export default HeaderButton
