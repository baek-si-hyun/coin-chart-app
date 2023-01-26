import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isLightAtom } from "../atom";

const Container = styled.div``;

type ChartProps = {
  coinId: string;
};

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
const Loader = styled.span`
  text-align: center;
  display: block;
`;
function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const isLight = useRecoilValue(isLightAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    coinId,
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: price.time_close * 1000,
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              width: 500,
              height: 300,
              background: "transparent",
              toolbar: {
                tools: {
                  download: false,
                  selection: false,
                  pan: false,
                  reset: false,
                },
              },
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
              },
            },
            grid: {
              show: false,
            },
            xaxis: { type: "datetime" },
            yaxis: { show: false },
            theme: {
              mode: isLight ? "light" : "dark",
            },
          }}
        />
      )}
    </Container>
  );
}
export default Chart;
