import IconButton from "@mui/material/IconButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import { styled } from "@mui/styles"
import React from "react"
import { useIconDictionary } from "../icon-dictionary"
import { iconMapping } from "../icon-mapping.js"

const theme = createTheme()
const Container = styled("div")(({ theme }) => ({
  width: 50,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  flexShrink: 0,
}))

type Props = {
  items: Array<{|
    name: string,
    helperText: string,
    icon?: ?React.Node,
    onClick: Function,
  |}>,
}

const emptyAr = []

export const IconSidebar = ({
  items = emptyAr,
  onClickItem,
  selectedTools = emptyAr,
}: Props) => {
  const customIconMapping = useIconDictionary()
  return (
    <ThemeProvider theme={theme}>
      <Container
        className="annoatation_iconSidebar"
        id="annoatation_iconSidebar"
      >
        {items.map((item) => {
          let NameIcon =
            customIconMapping[item.name.toLowerCase()] ||
            iconMapping[item.name.toLowerCase()] ||
            iconMapping["help"]

          const buttonPart = (
            <IconButton
              key={item.name}
              color={
                item.selected || selectedTools.includes(item.name.toLowerCase())
                  ? "primary"
                  : "default"
              }
              disabled={Boolean(item.disabled)}
              onClick={item.onClick ? item.onClick : () => onClickItem(item)}
            >
              {item.icon || <NameIcon />}
            </IconButton>
          )

          if (!item.helperText) return buttonPart

          return (
            <Tooltip key={item.name} title={item.helperText} placement="right">
              {buttonPart}
            </Tooltip>
          )
        })}
      </Container>
    </ThemeProvider>
  )
}

export default IconSidebar
