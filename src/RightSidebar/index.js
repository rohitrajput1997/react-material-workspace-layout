import ButtonBase from "@mui/material/ButtonBase"
import { grey } from "@mui/material/colors"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React, { useEffect, useMemo, useReducer } from "react"

const theme = createTheme()
const Container = styled("div")(({ theme }) => ({
  // width: 0,
  // display: "flex",
  // flexDirection: "column",
  // height: "100%",
  flexShrink: 0,
  backgroundColor: "#fff",
  // position: "relative",
  transition: "width 500ms",
  // "&.expanded": {
  //   width: 300,
  // },
}))

const Expander = styled(ButtonBase)(({ theme }) => ({
  width: 23,
  height: 40,
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "flex-start",
  borderTopLeftRadius: "50%",
  borderBottomLeftRadius: "50%",
  boxSizing: "border-box",
  borderTop: `1px solid ${grey[400]}`,
  borderBottom: `1px solid ${grey[400]}`,
  borderLeft: `1px solid ${grey[400]}`,
  boxShadow: "-1px 2px 5px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
  position: "absolute",
  top: "calc(50% - 20px)",
  left: -23,
  zIndex: 9999,
  transition: "opacity 500ms, left 500ms, width 500ms",
  "&.expanded": {
    left: -20,
    width: 20,
    opacity: 0.4,
    "& .icon": {
      marginLeft: 0,
    },
  },
  "& .icon": {
    marginLeft: 3,
  },
}))

const Slider = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  width: 0,
  bottom: 0,
  overflow: "hidden",
  transition: "opacity 500ms, left 500ms, width 500ms",
}))
const InnerSliderContent = styled("div")(({ theme }) => ({
  // width: 300,
  // position: "absolute",
  // right: 0,
  // top: 0,
  // bottom: 0,
  display: "flex",
  justifyContent: "space-around",
}))

const getInitialExpandedState = () => {
  try {
    return JSON.parse(window.localStorage.__REACT_WORKSPACE_LAYOUT_EXPANDED)
  } catch (e) {
    return window.innerWidth > 1000 ? true : false
  }
}

export const RightSidebar = ({ children, initiallyExpanded, height }) => {
  const [expanded, toggleExpanded] = useReducer(
    (state) => !state,
    initiallyExpanded === undefined
      ? getInitialExpandedState()
      : initiallyExpanded
  )

  useEffect(() => {
    if (initiallyExpanded === undefined) {
      window.localStorage.__REACT_WORKSPACE_LAYOUT_EXPANDED =
        JSON.stringify(expanded)
    }
  }, [initiallyExpanded, expanded])

  const containerStyle = useMemo(
    () => ({ margin: "auto", height: "auto" || height }),
    [height]
  )

  return (
    <ThemeProvider theme={theme}>
      <Container className={expanded ? "expanded" : ""} style={containerStyle}>
        <InnerSliderContent>{children}</InnerSliderContent>
      </Container>
    </ThemeProvider>
  )
}

export default RightSidebar
