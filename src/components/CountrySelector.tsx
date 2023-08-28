import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Image,
  InputLeftElement,
  useColorModeValue,
  FormLabel,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES } from "@/lib/countries";
import { SelectMenuOption } from "@/lib/types";

export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: SelectMenuOption) => void;
  selectedValue: SelectMenuOption;
}

export default function CountrySelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
}: CountrySelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && open) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const [query, setQuery] = useState("");

  return (
    <Box ref={ref} position="relative">
      <FormControl isRequired>
        <FormLabel htmlFor={id}>Select a Country</FormLabel>
        <InputGroup>
          <Input
            id={id}
            value={selectedValue.title}
            readOnly
            pr="4.5rem"
            disabled={disabled}
            onClick={onToggle}
            cursor="pointer"
            borderColor={borderColor}
          />
          <InputLeftElement width="3.5rem">
            <Image
              alt={`${selectedValue.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
              borderRadius="sm"
              rounded="sm"
              height={4}
              mr={2}
              display="inline"
            />
          </InputLeftElement>
          <InputRightElement>
            <Box
              h="1.75rem"
              onClick={onToggle}
              color="gray.400"
              justifyItems="center"
              alignItems="center"
              display="flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style={{ display: open ? "none" : "inline-block" }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style={{ display: open ? "inline-block" : "none" }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Box>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "absolute",
              marginTop: "1",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "lg",
              maxHeight: "80",
              borderRadius: "md",
              fontSize: "sm",
              overflowY: "scroll",
              zIndex: "10",
            }}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            <List border="1px" borderColor="gray.300" roundedBottom="sm">
              <ListItem py="2" px="3">
                <InputGroup>
                  <Input
                    type="search"
                    name="search"
                    autoComplete="off"
                    placeholder="Search a country"
                    w="full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    borderColor="gray.200"
                  />
                </InputGroup>
              </ListItem>
              <hr />
              <Box
                maxHeight="60"
                overflowY="scroll"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                    backgroundColor: "gray.100",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "gray.300",
                    borderRadius: "full",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "gray.600",
                  },
                  "&::-webkit-scrollbar-thumb:active": {
                    backgroundColor: "gray.600",
                  },
                  "&::-webkit-scrollbar-thumb:vertical": {
                    borderRadius: "full",
                  },
                  "&::-webkit-scrollbar-thumb:horizontal": {
                    borderRadius: "full",
                  },
                  "&::-webkit-scrollbar-track": {
                    borderRadius: "full",
                  },
                }}
              >
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <ListItem py="2" pl="3" pr="9">
                    No countries found
                  </ListItem>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    return (
                      <ListItem
                        key={`${id}-${index}`}
                        py="2"
                        pl="3"
                        pr="9"
                        display="flex"
                        alignItems="center"
                        _hover={{
                          bg: "gray.50",
                          transition: "background 0.2s",
                        }}
                        role="option"
                        onClick={() => {
                          onChange(value);
                          setQuery("");
                          onToggle();
                        }}
                        cursor="pointer"
                      >
                        <Image
                          alt={`${value.value}`}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                          borderRadius="sm"
                          height={4}
                          mr={2}
                          display="inline"
                        />

                        <span className="font-normal truncate">
                          {value.title}
                        </span>
                        {value.value === selectedValue.value && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            color="blue"
                            height={20}
                            width={20}
                            style={{
                              marginLeft: "auto",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </ListItem>
                    );
                  })
                )}
              </Box>
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
