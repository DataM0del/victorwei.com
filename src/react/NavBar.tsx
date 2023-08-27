import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Link, Menu, MenuButton, MenuItem, MenuList, SlideFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import vectorLogo from "../assets/vector.png";
import { AcrylicBackgroundChakraProps } from "../gui/constants";

const NavBar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <Box width="100%" position="fixed" left="0" top="0">
      <SlideFade in={visible} offsetY="-3.8rem">
        <HStack justifyContent="space-between" p="1rem" {...AcrylicBackgroundChakraProps}>
          <Link
            href="https://victorwei.com"
            style={{
              textDecoration: "none",
            }}
            role="group">
            <HStack gap={0}>
              <Box pr="1em">
                <Image
                  src={vectorLogo}
                  alt="Vector logo"
                  height="1.8rem"
                  transition="filter 300ms"
                  _groupHover={{
                    filter: "drop-shadow(0 0 2em red)",
                  }}
                />
              </Box>
              <Text fontSize="1.5em">Victor Wei</Text>
            </HStack>
          </Link>
          {isMobile ? (
            <Menu>
              <MenuButton as={HamburgerIcon}></MenuButton>
              <MenuList color="black">
                <MenuItem>About</MenuItem>
                <MenuItem>Experience</MenuItem>
                <MenuItem>Projects</MenuItem>
                <MenuItem>Contact</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack gap="2em" mr="1em">
              <Link>About</Link>
              <Link>Experience</Link>
              <Link>Projects</Link>
              <Link>Contact</Link>
            </HStack>
          )}
        </HStack>
      </SlideFade>
    </Box>
  );
};

export default NavBar;
