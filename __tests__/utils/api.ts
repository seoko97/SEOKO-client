const jsonResponse = (body: unknown, init?: ResponseInit) => {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
};

const getRequest = (fetchMock: jest.Mock, call = 0) => {
  const [url, init] = fetchMock.mock.calls[call] as [URL, RequestInit];

  return { url, init };
};

export { getRequest, jsonResponse };
