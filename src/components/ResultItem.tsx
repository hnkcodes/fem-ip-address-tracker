interface ResultItemProp {
  title: string;
  description: string;
}

export default function ResultItem({ title, description }: ResultItemProp) {
  return (
    <div className="result-item">
      <h3 className="result-title">{title}</h3>
      <p className="result-description">{description}</p>
    </div>
  );
}
