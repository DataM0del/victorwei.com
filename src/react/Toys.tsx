import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Select,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPower, FiSettings } from "react-icons/fi";
import { useMobile } from "../utils/hooks";
import toys from "../gui";

const Toys: React.FC<{
  powered: boolean;
  setPowered: (powered: boolean) => void;
}> = ({ powered, setPowered }) => {
  const [isMobile] = useMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isMobile) return null;

  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent zIndex={2} bgColor="#242424" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <FormLabel>Toy</FormLabel>
            <Select
              onChange={(e) => {
                toys.selectedToy = e.target.value as string;
              }}>
              <option value="rope">Rope</option>
              <option value="force">Gravity</option>
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose} color="white">
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              Done
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <VStack position="fixed" right="2em" bottom="2em">
        {powered && (
          <Tooltip label="Toy settings" closeOnClick={false} placement="left">
            <Box
              onClick={onOpen}
              _hover={{
                transform: "scale(1.2)",
                cursor: "pointer",
              }}
              transition="transform 0.2s">
              <FiSettings size="1.3em" />
            </Box>
          </Tooltip>
        )}

        <Tooltip label={powered ? "Turn off toys" : "Turn on toys"} closeOnClick={false} placement="left">
          <Box
            p="1em"
            onClick={() => {
              setPowered(!powered);
            }}
            _hover={{
              transform: "scale(1.2)",
              cursor: "pointer",
            }}
            transition="transform 0.2s">
            <FiPower size="1.3em" color={powered ? "rgba(255, 255, 255, 0.87)" : "rgba(255, 255, 255, 0.3)"} />
          </Box>
        </Tooltip>
      </VStack>
    </>
  );
};

export default Toys;
