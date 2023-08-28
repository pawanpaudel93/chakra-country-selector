import { Box, Flex, Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg="transparent" px={4} position="fixed" top={0} right={0}>
        <Flex h={16} alignItems={"center"} justifyContent="flex-end">
          <Button onClick={toggleColorMode} variant="ghost" rounded="full">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
