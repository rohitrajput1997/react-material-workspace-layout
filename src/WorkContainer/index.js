import { grey } from "@mui/material/colors"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React from "react"

const theme = createTheme()
const Container = styled("div")(({ theme }) => ({
  position: "relative",
  flexGrow: 1,
  flexShrink: 1,
  height: "100%",
  backgroundColor: grey[50],
  overflowY: "auto",
}))
const ShadowOverlay = styled("div")(({ theme }) => ({
  content: "' '",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  pointerEvents: "none",
  boxShadow:
    "inset 0 3px 5px rgba(0,0,0,0.15), inset -3px 0 5px rgba(0,0,0,0.15), inset 3px 0 5px rgba(0,0,0,0.15)",
}))

export const WorkContainer = React.forwardRef(({ children }, ref) => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        className="annoatation_imageCanvas"
        ref={ref}
        id="annoatation_imageCanvas"
      >
        {children}
        <ShadowOverlay />
      </Container>
    </ThemeProvider>
  )
})

export default WorkContainer
