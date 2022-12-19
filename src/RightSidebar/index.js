import ExpandIcon from "@mui/icons-material/KeyboardArrowLeft"
import ContractIcon from "@mui/icons-material/KeyboardArrowRight"
import { Button } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React, { useEffect, useMemo, useReducer } from "react"

const theme = createTheme()
const Container = styled("div")(({ theme }) => ({
  width: 0,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flexShrink: 0,
  backgroundColor: "#fff",
  position: "relative",
  transition: "width 500ms",
  "&.expanded": {
    width: 300,
  },
}))
let buttonStyle = {
  alignItems: "center",
  // justifyContent: "flex-start",
  // borderTopLeftRadius: "50%",
  // borderBottomLeftRadius: "50%",
  boxSizing: "border-box",
  // borderTop: `1px solid ${grey[400]}`,
  // borderBottom: `1px solid ${grey[400]}`,
  // borderLeft: `1px solid ${grey[400]}`,
  boxShadow: "-1px 2px 5px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
  transition: "opacity 500ms, left 500ms, width 500ms",
  opacity: 0.4,
}
const Expander = styled(ButtonBase)(({ theme }) => ({
  width: 23,
  height: 40,
  display: "flex",
  overflow: "hidden",

  position: "fixed",
  right: "320px",
  top: "calc(50% - 20px)",
  left: -23,
  zIndex: 9999,

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
  "&.expanded": {
    width: 300,
  },
}))
const InnerSliderContent = styled("div")(({ theme }) => ({
  width: 300,
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  overflowY: "auto",
}))

const getInitialExpandedState = () => {
  try {
    return JSON.parse(window.localStorage.__REACT_WORKSPACE_LAYOUT_EXPANDED)
  } catch (e) {
    return window.innerWidth > 1000 ? true : false
  }
}

export const RightSidebar = ({
  children,
  initiallyExpanded,
  height,
  rightMenu,
}) => {
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
    () => ({
      height: height || "100%",
      padding: "0px 10px",
      overflowY: "scroll",
      position: "absolute",
      zIndex: 100,
      right: 0,
      boxShadow: "rgb(0 0 0 / 10%) -11px 9px 10px",
    }),
    [height]
  )

  return (
    <ThemeProvider theme={theme}>
      {rightMenu && (
        <Container
          className={
            expanded
              ? "expanded annoatation_rightSidebar"
              : "annoatation_rightSidebar"
          }
          style={containerStyle}
          id="annoatation_rightSidebar"
        >
          <Slider className={expanded ? "expanded" : ""}>
            <InnerSliderContent>{children}</InnerSliderContent>
          </Slider>
          {rightMenu && (
            <Button
              onClick={() => {
                toggleExpanded()
              }}
              // className={expanded ? "expanded" : ""}
              style={{
                position: "fixed",
                top: "calc(50% - 20px)",
                right: expanded ? "320px" : "20px",
                border: "1px solid #005f86",
                ...buttonStyle,
              }}
            >
              {expanded ? (
                <ContractIcon className="icon" />
              ) : (
                <ExpandIcon className="icon" />
              )}
            </Button>
          )}
        </Container>
      )}
    </ThemeProvider>
  )
}

export default RightSidebar
