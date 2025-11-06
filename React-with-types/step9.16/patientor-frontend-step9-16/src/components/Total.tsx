interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => (
  <p><b>Number of exercises {total}</b></p>
);

export default Total;
