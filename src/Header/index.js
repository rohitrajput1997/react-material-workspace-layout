import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React from "react"
import HeaderButton from "../HeaderButton"

const theme = createTheme()
const emptyObj = {}

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ccc",
  alignItems: "center",
  flexShrink: 1,
  boxSizing: "border-box",
}))

type Props = {|
  leftSideContent?: ?React.Node,
  onClickItem?: Function,
  items: Array<{|
    name: string,
    icon?: ?React.Node,
    onClick?: Function,
  |}>,
|}

export const Header = ({
  leftSideContent = null,
  hideHeaderText = false,
  items,
  onClickItem,
}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        id="annoatation_headerSidebar"
        className="annoatation_headerSidebar"
      >
        <Box flexGrow={1}>{leftSideContent}</Box>
        {items.map((item) => (
          <HeaderButton
            key={item.name}
            hideText={hideHeaderText}
            onClick={() => onClickItem(item)}
            {...item}
          />
        ))}
      </Container>
    </ThemeProvider>
  )
}

export default Header
