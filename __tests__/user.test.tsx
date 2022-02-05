import Home from "@pages";
import { render, screen } from "../__mocks__/customRender";

describe("User component", () => {
	test("renders without crashing", () => {
		render(<Home />);
		const title = screen.getByRole("heading", { name: /dashboard/i });
		expect(title).toBeInTheDocument();
	});
});
