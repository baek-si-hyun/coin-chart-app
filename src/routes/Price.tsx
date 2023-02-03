import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { PriceData } from "./Coin";

interface PriceProps {
  tickersData: PriceData;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 6rem;
  gap: 1rem;
`;

const TopDataBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  grid-area: 1 / 1 / 2 / 3;
  padding: 1.2rem;
  justify-content: space-between;
`;
const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  background-color: rgb(59, 59, 59);
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.cardBgColor};
`;

const InnerTop = styled.span`
  opacity: 0.6;
  font-weight: 600;
  font-size: 1rem;
  color: #979797;
`;

const AthPriceLabel = styled.span`
  font-size: 1rem;
  color: #979797;
  line-height: 1.5rem;
`;

const AthPrice = styled.span`
  font-size: 2rem;
`;
interface Percentage {
  percentage: number;
  className: string;
}

function PercentBox({ percentage, className }: Percentage) {
  const upArrow = "↑";
  const downArrow = "↓";
  const flat = "-";
  return (
    <div className={className}>
      <div style={{ float: "left" }}>{percentage}%</div>
      <div style={{ float: "right", fontWeight: "700" }}>
        {percentage > 0 ? upArrow : percentage === 0 ? flat : downArrow}
      </div>
    </div>
  );
}
const InnerBottom = styled(PercentBox)<{ percentage: number }>`
  font-size: 2rem;
  color: ${(props) =>
    props.percentage > 0
      ? props.theme.upColor
      : props.percentage === 0
      ? props.theme.flatColor
      : props.theme.downColor};
`;

function Price() {
  const { tickersData } = useOutletContext<PriceProps>();
  const data = tickersData?.quotes?.USD;
  const date = new Date(data.ath_date);
  const dateFormat = date.toLocaleDateString("ko-KR");
  const timeFormat = date.toLocaleTimeString("en-US");
  return (
    <Container>
      <TopDataBox>
        <AthPriceLabel>
          All Time High <br />
          {dateFormat} {timeFormat}
        </AthPriceLabel>
        <AthPrice>${data?.ath_price?.toFixed(3)}</AthPrice>
      </TopDataBox>
      <DataBox>
        <InnerTop>change 15m</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_15m}
        />
      </DataBox>
      <DataBox>
        <InnerTop>change 1hour</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_1h}
        />
      </DataBox>
      <DataBox>
        <InnerTop>change 12hour</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_12h}
        />
      </DataBox>
      <DataBox>
        <InnerTop>change 1day</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_24h}
        />
      </DataBox>
      <DataBox>
        <InnerTop>change 1week</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_7d}
        />
      </DataBox>
      <DataBox>
        <InnerTop>change 1month</InnerTop>
        <InnerBottom
          className="inner_bottom"
          percentage={data.percent_change_30d}
        />
      </DataBox>
    </Container>
  );
}
export default Price;
