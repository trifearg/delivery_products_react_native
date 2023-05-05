import { userSlice, setUser } from "../redux/slices/userSlice";

test("get initial state", () => {
  expect(userSlice.reducer(undefined, { type: undefined })).toEqual(
    { name: "", userId: "", token: "", location: "" },
  );
});

test("set user", () => {
  const previousState = {
    name: "",
    userId: "",
    token: "",
    location: "",
  };

  expect(userSlice.reducer(previousState, setUser({name: "Mikhail", userId: "1", token: "token"}))).toEqual(
    { name: "Mikhail", userId: "1", token: "token", location: "" },
  );
});
