import { useParams, Link, Outlet, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

type RouteParams = {
  coinId: string;
};
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
  max-width: 20rem;
  text-overflow: ellipsis;
  overflow-x: clip;
  white-space: nowrap;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 300px;
  font-size: 3rem;
`;
const Label = styled.div`
  color: #979797;
  font-size: 1rem;
  opacity: 0.6;
  font-weight: 700;
`;
const Overview = styled.div`
  display: flex;
  justify-content: center;

  gap: 4rem;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
  font-size: inherit;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.5rem;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;
const Description = styled.p`
  margin: 40px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.textColor : "#979797")};
  a {
    display: block;
  }
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
`;

const BackBTN = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
  position: absolute;
  left: 0;
  span {
    padding: 10px;
  }
`;

function Coin() {
  const { coinId } = useParams() as RouteParams;
  const priceMatch = useMatch(`/:${coinId}/price`);
  const chartMatch = useMatch(`/:${coinId}/chart`);
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Header>
            <BackBTN to="/coin-chart-app">
              <span>←</span>
            </BackBTN>
            <Title>{infoData?.name}</Title>
          </Header>
          <Overview>
            <OverviewItem>
              <Label>Rank:</Label>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <Label>Symbol:</Label>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <Label>Open Source:</Label>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <Label>Total Suply:</Label>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <Label>Max Supply:</Label>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
}
export default Coin;
