interface Props {
  title: string;
  value: string;
}

const CardField: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="grid grid-cols-2 gap-3 border-b-2 border-b-mainPurple last:border-b-0">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default CardField;
