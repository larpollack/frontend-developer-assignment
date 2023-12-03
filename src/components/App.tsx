import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import { ChakraProvider } from "@chakra-ui/react";
import ListController from "./ListController/ListController";
import customTheme from "../theme";

const App = () => (
	<ChakraProvider theme={customTheme}>
		<ListController />
		<TimescaleLogo />
	</ChakraProvider>
);

export default App;
