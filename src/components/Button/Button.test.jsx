import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it("should render the button with the text 'Load more'", () => {
    render(<Button text="Load More" />);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });
  it("should call function on button", () => {
    const fn = jest.fn();
    render(<Button text="Load More" clicado={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("should be disable when disable is true", () => {
    render(<Button text="Load More" disable={true} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeDisabled();
  });
  it("Should match snapshot", () => {
    const { container } = render(<Button text="Load More" disable={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
