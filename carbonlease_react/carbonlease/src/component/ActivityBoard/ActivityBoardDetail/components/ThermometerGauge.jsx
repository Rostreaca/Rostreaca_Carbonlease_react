import { GaugeFill, GaugeWrapper } from "../ActivityBoardDetail.styles";

const ThermometerGauge = ({ value }) => {
  return (
    <GaugeWrapper>
      <GaugeFill style={{ height: `${Math.min(value, 100)}%` }} />
    </GaugeWrapper>
  );
};

export default ThermometerGauge;
