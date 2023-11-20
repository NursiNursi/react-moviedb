import { createStore } from "redux";
import reducer from "./components/slice";

const store = createStore(reducer);

export default store;
