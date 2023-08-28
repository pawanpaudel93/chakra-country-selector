import { Box, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { SelectMenuOption } from "@/lib/types";
import { COUNTRIES } from "@/lib/countries";
import CountrySelector from "@/components/CountrySelector";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<SelectMenuOption>({
    title: "Nepal",
    value: "NP",
  });

  return (
    <Box
      display="flex"
      minH="100vh"
      minW="100hw"
      justifyContent="center"
      alignItems="center"
    >
      <Box w={350}>
        <CountrySelector
          id="country-selector"
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(country) => {
            setCountry(country);
          }}
          selectedValue={
            COUNTRIES.find(
              (option) => option.value === country.value
            ) as SelectMenuOption
          }
        />
        <Spacer h={4} />
        <Box textAlign="center">{JSON.stringify(country, undefined, 2)}</Box>
      </Box>
    </Box>
  );
}

export default App;
