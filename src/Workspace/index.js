import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/styles"
import React from "react"
import useDimensions from "react-use-dimensions"
import Header from "../Header"
import { IconDictionaryContext } from "../icon-dictionary.js"
import IconSidebar from "../IconSidebar"
import RightSidebar from "../RightSidebar"
import WorkContainer from "../WorkContainer"

const emptyAr = []
const emptyObj = {}
const theme = createTheme()

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
}))
const SidebarsAndContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
}))

export default ({
  style = emptyObj,
  iconSidebarItems = emptyAr,
  selectedTools = ["select"],
  headerItems = emptyAr,
  rightSidebarItems = emptyAr,
  onClickHeaderItem,
  onClickIconSidebarItem,
  headerLeftSide = null,
  iconDictionary = emptyObj,
  rightSidebarExpanded,
  hideHeader = false,
  hideHeaderText = false,
  children,
  rightMenu = true,
}) => {
  const [sidebarAndContentRef, sidebarAndContent] = useDimensions()
  return (
    <ThemeProvider theme={theme}>
      <IconDictionaryContext.Provider value={iconDictionary}>
        <Container style={style}>
          {!hideHeader && (
            <Header
              hideHeaderText={hideHeaderText}
              leftSideContent={headerLeftSide}
              onClickItem={onClickHeaderItem}
              items={headerItems}
            />
          )}
          <SidebarsAndContent ref={sidebarAndContentRef}>
            {iconSidebarItems.length === 0 ? null : (
              <IconSidebar
                onClickItem={onClickIconSidebarItem}
                selectedTools={selectedTools}
                items={iconSidebarItems}
              />
            )}
            <WorkContainer>{children}</WorkContainer>
            {rightSidebarItems.length === 0 ? null : (
              <RightSidebar
                initiallyExpanded={rightSidebarExpanded}
                height={sidebarAndContent.height || 0}
                rightMenu={rightMenu}
              >
                {rightSidebarItems}
              </RightSidebar>
            )}
          </SidebarsAndContent>
        </Container>
      </IconDictionaryContext.Provider>
    </ThemeProvider>
  )
}
