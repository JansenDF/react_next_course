import { render, screen } from "@testing-library/react";

import { Posts } from ".";

const props = {
  posts: [
    {
      id: 1,
      title: "title 1",
      body: "body 1",
      cover: "img/img1.png",
    },
    {
      id: 2,
      title: "title 2",
      body: "body 2",
      cover: "img/img2.png",
    },
  ],
};

describe("<Posts />", () => {
  it("Should render posts corretly", () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(2);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(2);
    expect(screen.getAllByText(/body/i)).toHaveLength(2);
    expect(screen.getByRole("img", { name: /title 2/i })).toHaveAttribute(
      "src",
      "img/img2.png"
    );
  });
  it("Should match snapshot", () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Should not render Posts", () => {
    render("<Posts />");
    expect(
      screen.queryByRole("heading", { name: /title 1/i })
    ).not.toBeInTheDocument();
  });
});
