import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("Should search for posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem Posts com esta busca");

    expect.assertions(16);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    const reset = (textInput) => {
      userEvent.clear(textInput);
    };

    expect(search).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "title1 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title2 2" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title3 3" })
    ).not.toBeInTheDocument();

    //Test input search with "title1"
    userEvent.type(search, "title1");
    expect(
      screen.getByRole("heading", { name: "title1 1" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title2 2" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title3 3" })
    ).not.toBeInTheDocument();
    //Test if it displays text search
    expect(
      screen.getByRole("heading", { name: "Search value: title1" })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Encontramos 1 posts com a palavra "title1"')
    ).toBeInTheDocument();

    //clear input search
    reset(search);

    //test input search with text unavailable
    userEvent.type(search, "sddasd");
    expect(
      screen.getByText("Não existem Posts com esta busca")
    ).toBeInTheDocument();

    //clear input search
    reset(search);
    expect(
      screen.getByRole("heading", { name: "title1 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title2 2" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title3 3" })
    ).not.toBeInTheDocument();

    //Test input search with "title2"
    userEvent.type(search, "title2");
    expect(
      screen.queryByRole("heading", { name: "title1 1" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title2 2" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title3 3" })
    ).not.toBeInTheDocument();
  });

  it("Should more posts", async () => {
    render(<Home />);

    const noMorePosts = screen.getByText("Não existem Posts com esta busca");

    // expect.assertions(16);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByText("More Posts");

    userEvent.click(button);
    expect(
      screen.getByRole("heading", { name: "title3 3" })
    ).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
