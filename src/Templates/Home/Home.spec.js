import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Home from ".";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title1",
          body: "body1",
          url: "img1.png",
        },
        {
          userId: 2,
          id: 2,
          title: "title2",
          body: "body2",
          url: "img2.png",
        },
        {
          userId: 3,
          id: 3,
          title: "title3",
          body: "body3",
          url: "img3.png",
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("Should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem Posts com esta busca");

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole("img", { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole("button", { name: /more posts/i });
    expect(button).toBeInTheDocument();
  });
});
