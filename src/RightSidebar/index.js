import { Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React, { useEffect, useMemo, useReducer } from "react"
import { TbCircleChevronLeft, TbCircleChevronRight } from "react-icons/tb"

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
  boxSizing: "border-box",
  boxShadow: "-1px 2px 5px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
  transition: "opacity 500ms, left 500ms, width 500ms",
  opacity: 1,
  minWidth: "23px",
  padding: "3px 4px",
  zIndex: 100,
}

let icons = {
  height: "20px",
  width: "20px",
  color: "#005f86 !important",
}

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
        <Button
          onClick={() => {
            toggleExpanded()
          }}
          style={{
            position: "absolute",
            top: "calc(50% - 20px)",
            right: expanded ? "320px" : "20px",
            ...buttonStyle,
          }}
        >
          {expanded ? (
            <TbCircleChevronRight style={{ ...icons }} />
          ) : (
            <TbCircleChevronLeft style={{ ...icons }} />
          )}
        </Button>
      )}
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
        </Container>
      )}
    </ThemeProvider>
  )
}

export default RightSidebar

