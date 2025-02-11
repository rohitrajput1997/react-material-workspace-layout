// @flow

import ExpandIcon from "@mui/icons-material/ExpandMore"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import ResizePanel from "@seveibar/react-resize-panel"
import classnames from "classnames"
import React, { memo, useCallback, useState } from "react"
import useEventCallback from "use-event-callback"
import { useIconDictionary } from "../icon-dictionary.js"

const theme = createTheme()
const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid #005f86",
    borderRadius: "6px",
    margin: "10px 10px 8px 10px",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingLeft: 16,
    paddingRight: 12,
    "& .iconContainer": {
      color: "#005f86 !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .MuiSvgIcon-root": {
        width: 16,
        height: 16,
        color: "#005f86 !important",
      },
    },
  },
  title: {
    fontSize: 11,
    flexGrow: 1,
    fontWeight: 800,
    paddingLeft: 8,
    color: "#005f86 !important",
    "& span": {
      color: "#005f86 !important",
      fontSize: 11,
    },
  },
  expandButton: {
    padding: 0,
    width: 30,
    height: 30,
    "& .icon": {
      width: 20,
      height: 20,
      transition: "500ms transform",
      "&.expanded": {
        transform: "rotate(180deg)",
      },
    },
  },
  expandedContent: {
    maxHeight: 500,
    overflowY: "auto",
    "&.noScroll": {
      overflowY: "visible",
      overflow: "visible",
    },
  },
  titleIcon: {
    color: "#005f86 !important",
  },
}))

const getExpandedFromLocalStorage = (title) => {
  try {
    return JSON.parse(
      window.localStorage[`__REACT_WORKSPACE_SIDEBAR_EXPANDED_${title}`]
    )
  } catch (e) {
    return false
  }
}
const setExpandedInLocalStorage = (title, expanded) => {
  window.localStorage[`__REACT_WORKSPACE_SIDEBAR_EXPANDED_${title}`] =
    JSON.stringify(expanded)
}

export const SidebarBox = ({
  icon,
  title,
  subTitle,
  children,
  noScroll = false,
  expandedByDefault,
}) => {
  const classes = useStyles()
  const content = (
    <div
      className={classnames(classes.expandedContent, noScroll && "noScroll")}
    >
      {children}
    </div>
  )

  const [expanded, changeExpandedState] = useState(
    expandedByDefault === undefined
      ? getExpandedFromLocalStorage(title)
      : expandedByDefault
  )
  const changeExpanded = useCallback(
    (expanded) => {
      changeExpandedState(expanded)
      setExpandedInLocalStorage(title, expanded)
    },
    [changeExpandedState, title]
  )

  const toggleExpanded = useEventCallback(() => changeExpanded(!expanded))
  const customIconMapping = useIconDictionary()
  const TitleIcon = customIconMapping[title.toLowerCase()]
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className="iconContainer" onClick={toggleExpanded}>
            {icon || <TitleIcon className={classes.titleIcon} />}
          </div>
          <Typography className={classes.title}>
            {title} <span>{subTitle}</span>
          </Typography>
          <IconButton onClick={toggleExpanded} className={classes.expandButton}>
            <ExpandIcon
              className={classnames("icon", expanded && "expanded")}
            />
          </IconButton>
        </div>
        {noScroll ? (
          expanded ? (
            content
          ) : null
        ) : (
          <Collapse in={expanded}>
            <ResizePanel direction="s" style={{ height: 200 }}>
              <div
                className="panel"
                style={{ display: "block", overflow: "hidden", height: 500 }}
              >
                {content}
              </div>
            </ResizePanel>
          </Collapse>
        )}
      </div>
    </ThemeProvider>
  )
}

export default memo(
  SidebarBox,
  (prev, next) => prev.title === next.title && prev.children === next.children
)

