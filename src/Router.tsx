import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coin-chart-app" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />}></Route>
          <Route path="price" element={<Price />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
